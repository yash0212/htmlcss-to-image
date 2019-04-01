# HTML CSS to Image Convert (API)

An API to convert html and css to image

This repo will work only with RapidAPI Integration, changes can be made to work solely.
**Features**

- Convert plain HTML and CSS code to png image

- Future update will contain support for other image formats like jpg.

**Benefits**

- You can use this API to render invoices as an image on your website so users cannot modify the invoice even on the frontend.

**How to use**

This API has only 1 endpoint which is `/convert`

It will accept two body parameters in request

1. `html` - **Required**
   You have to pass you simple html code in it. You can minify your html before sending the API request to reduce the response time of API. Example code that you can pass in this field:

```
<body>
	<h1>The Cottage Garden</h1>
	<p>The <i>cottage garden</i> is a distinct style of garden that uses an informal design, dense plantings, and a mixture of ornamental and edible plants.</p>
	<p>The Cottage Garden originated in <a href="">England</a> and its history can be traced back for centuries, although they were re-invented in 1870's England, when stylized versions were formed as a reaction to the more structured and rigorously maintained <a href="">English estate gardens</a>.</p>
	<p>The earliest cottage gardens were more practical than their modern descendants, with an emphasis on vegetables and herbs, along with some fruit trees.</p>
</body>
```

OR

```
<body><h1>The Cottage Garden</h1><p>The <i>cottage garden</i> is a distinct style of garden that uses an informal design, dense plantings, and a mixture of ornamental and edible plants.</p><p>The Cottage Garden originated in <a href="">England</a> and its history can be traced back for centuries, although they were re-invented in 1870's England, when stylized versions were formed as a reaction to the more structured and rigorously maintained <a href="">English estate gardens</a>.</p><p>The earliest cottage gardens were more practical than their modern descendants, with an emphasis on vegetables and herbs, along with some fruit trees.</p></body>
```

2. `css` - **Optional**
   You have to pass you simple css code in it. You can minify your css before sending the API request to reduce the response time of API. Example code that you can pass in this field:

```
body {
	font-family: Helvetica, Arial, sans-serif;
	color: #654;
	padding: 22px
}
h1, h2, p {
	padding: 12px;
	line-height: 2em
}
i, a, a:hover, a:visited {
	color: #654
}
```

OR

```
body{font-family:Helvetica,Arial,sans-serif;color:#654;padding:22px}h1,h2,p{padding:12px;line-height:2em}i,a,a:hover,a:visited{color:#654}
```

**Notes**

- Do not provide any link to stylesheet or other scripts relative to your filesystem because that will not work on our servers alternatively you can upload those files to a CDN and then include then in your HTML code.

- If you use any custom fonts in css, then please include then in your csss file using links like for Roboto google font use in the css parameter

```
@import url('https://fonts.googleapis.com/css?family=Roboto');
p{
  font-family: 'Roboto';
}
```

- Avoid using script tags in the HTML code as they will be useless in image rendering and might create unwanted issues.

**Response**
You will get a response in `JSON` format
A successful API hit will yield response like

```
{
"status":200
"success":"true"
"error":NULL
"imageData":"base64 encoded png data"
}
```

For any unsuccessful API hit or some error in API you will get a relative status code in response.

**Hints on using base64 encoded png data**
You can use the `imageData` received from API in an image tag in the format
`<img src="data:image/png;base64, {imageData}">`
You have to replace `{imageData}` with the `imageData` you received from the API.
You can find more hints on this [link](https://stackoverflow.com/a/8499716/6043416)

**Puppeteer troubleshoot [guide](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch)**
Most likely you would face issues of dependencies of puppeteer whose fix is available in above link

---

My contact - yashlotan7@gmail.com
I can design your APIs too.
