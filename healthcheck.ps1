$urls = @(
    "http://localhost:8080/",
    "http://localhost:8080/styles.css",
    "http://localhost:8080/script.js",
    "http://localhost:8080/assets/hero-wood.jpg",
    "http://localhost:8080/assets/mdf-blockboard.jpg",
    "http://localhost:8080/assets/ply-veneer-blockboard.jpg",
    "http://localhost:8080/assets/mdf-sandwich-blockboard.jpg",
    "http://localhost:8080/assets/logo.png",
    "http://localhost:8080/assets/logo-icon.png"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 5
        Write-Host "SUCCESS: $u [Status: $($res.StatusCode), Size: $($res.RawContentLength) bytes]"
    } catch {
        Write-Host "FAILED: $u [Error: $_]"
    }
}
