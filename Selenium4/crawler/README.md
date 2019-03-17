# JavaScript Virtual Grid Sitemap Crawler

### Quickly collect screenshots of all your website pages and responsive viewports.

### To use:

```
$ node crawler.js --help

Usage: crawler [options]

Options:
  -V, --version                 output the version number
  -u --url [url]                Add the site URL you want to generate a sitemap for. e.g. -u https://www.seleniumconf.com
  -s --sitemap [sitemap]        Use an already existing sitemap file. e.g. -s "/path/to/sitemap.xml" Note: This overrides the -u arg
  -m, --sitemapUrl [sitemapUrl  Specify a sitemap URL. e.g. -m https://www.example.com/sitemap.xml
  -b, --browsers [browsers]     Add the MAX number of browsers to run concurrently. e.g. -b 10. Note: Be careful with this!
  -k, --key [key]'              Set your Applitools API Key. e.g. -k yourLongAPIKeyyyyy
  -v, --serverUrl [serverUrl]   Set your Applitools on-prem or private cloud server URL. (Default: https://eyes.applitools.com). e.g. -v https://youreyes.applitools.com
  --no-grid                     Disable the Visual Grid and run locally only (Default: true). e.g. --no-grid
  --log                         Enable Applitools Debug Logs (Default: false). e.g. --log
  --headless                    Run Chrome headless (Default: false). e.g. --headless
  -h, --help                    output usage information
```

### Examples:

* Set an environment variable for your Applitools API Key. e.g. export APPLITOOLS_API_KEY="Your_API_KEY"
* Generate Sitemap and Run: `$ crawler.js -u https://seleniumconf.com`
* Set API Key and On-Prem/Private Cloud and Run: `$ node crawler.js -u https://seleniumconf.com -k YourApiKey -v https://youreyes.applitools.com`
* Use existing sitemap.xml and Run: `$ node crawler.js -s ./www.seleniumconf.com.xml`
* Use a self made sitemap and Run: `$ node crawler.js -s ./random-sitemap.xml`
* Use a sitemap.xml URL and Run: `$ node crawler.js -m https://www.wunderlist.com/sitemap.xml`
* Open 20 browsers concurrently (default: 10): `$ node crawler.js -s ./www.seleniumconf.com.xml -b 20`
* Disable Visual Grid and Run locally: `$ node crawler.js -s ./www.seleniumconf.com.xml --no-grid`
* Enable Applitools Debug logs: `$ node crawler.js -s ./www.seleniumconf.com.xml --log`
* Run Chrome Headless: `$ node crawler.js -s ./www.seleniumconf.com.xml --headless`

### VG Hardcoded Options:

```
configuration.addBrowser( 500,  800, BrowserType.CHROME  );
configuration.addBrowser( 500,  800, BrowserType.FIREFOX );
configuration.addBrowser( 1000, 800, BrowserType.CHROME  );
configuration.addBrowser( 1000, 800, BrowserType.FIREFOX );
configuration.addBrowser( 1500, 800, BrowserType.CHROME  );
configuration.addBrowser( 1500, 800, BrowserType.FIREFOX );
```