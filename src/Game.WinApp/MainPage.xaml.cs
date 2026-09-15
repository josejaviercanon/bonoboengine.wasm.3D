using Microsoft.UI.Xaml.Controls;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Game_WinApp;

/// <summary>
/// The main content page displayed inside the application window.
/// Add your UI logic, event handlers, and data binding here.
/// </summary>
public sealed partial class MainPage : Page
{
    const string AppName = "BonoboEngine";

    public MainPage()
    {
        InitializeComponent();

        // initialization logic here.       
        InitializeBabylonEngine();  // Fire off the asynchronous engine initialization
    }


    private async void InitializeBabylonEngine()
    {
        try
        {
            // 1. Establish an absolute write-safe directory in the user's Local AppData folder
            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string userDataFolder = Path.Combine(localAppData, AppName, "WebView2Data");

            // Ensure the data folder structure safely exists on the host disk
            Directory.CreateDirectory(userDataFolder);

            // 1. Wait for Windows to spin up the Chromium WebView2 runtime environment
            await BabylonWebView.EnsureCoreWebView2Async();

            // 2. Resolve the path to the 'wwwroot' folder residing next to your AOT executable
            string localFolder = Path.Combine(AppContext.BaseDirectory, "wwwroot");

            // 2. Instantiate a custom WebView2 Environment mapped to our safe path
            CoreWebView2Environment webViewEnvironment = await CoreWebView2Environment.CreateAsync(
                browserExecutableFolder: null, // Pulls the system's default Edge WebView2 runtime
                userDataFolder: userDataFolder,  // 🚀 The write-safe data directory target
                options: null
            );

            // 3. Initialize the viewport using the target environment structure
            await BabylonWebView.EnsureCoreWebView2Async(webViewEnvironment);

            // 4. Map the local 'wwwroot' folder next to the binary for virtual asset mapping
            string localAssetFolder = Path.Combine(AppContext.BaseDirectory, "wwwroot");
            BabylonWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "babylon.local", 
                localAssetFolder, 
                CoreWebView2HostResourceAccessKind.Allow
            );

            // 5. Point the control to your virtual web address
            BabylonWebView.Source = new Uri("http://babylon.local");
            
        }
        catch (Exception ex)
        {
            // Error fallback (e.g., if the WebView2 runtime isn't installed on the OS)
            System.Diagnostics.Debug.WriteLine($"Failed to initialize WebView2: {ex.Message}");
        }
    }

}
