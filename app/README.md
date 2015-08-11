Freelancer Jekyll theme
=========================

Jekyll theme based on [Freelancer bootstrap theme ](http://startbootstrap.com/templates/freelancer/)

## How to use
 - Place a image in `/img/portoflio/`
 - Replace `you@email.com` in `_includes/contact_static.html` with your email address. refer to [formspree](http://formspree.io/) for more information.
 - Create posts to display your projects. Use the follow as an example:
```txt
---
layout: default
modal-id: 1
date: 2014-07-18
img: cabin.png
alt: image-alt
project-date: July 2014
client: The Client
category: Web Development
description: The description of the project

---
```

## Demo
View this jekyll theme in action [here](https://jeromelachaud.github.io/freelancer-theme)

## Screenshot
![screenshot](https://raw.githubusercontent.com/jeromelachaud/freelancer-theme/master/screenshot.png)

=========
For more details, read the [documentation](http://jekyllrb.com/)



Originally the code looked like:

```
{% capture svg %}{% include iconmonstr-globe-4-icon.svg  %}{% endcapture %}
{% assign svgsplit = svg | split: 'svg11.dtd">' %}
{% assign svgpart = svgsplit[1] | escape %}
{{ svgpart }}                            
```

But this didn't work.  You need to  remove the dtd stuff also.  And the encode turned <svg into &lt;svg which isn't what we want either.


to replace 

```html
                    <object data="img/iconmonstr-globe-4-icon.svg"  class="img-responsive light-svg" type="image/svg+xml">
                        <img class="img-responsive" src="img/profile.png" alt="">
                    </object>

```

```
                    <div class="img-responsive light-svg header-icon">
{% capture svg %}{% include {{post.svg}}  %}{% endcapture %}
{% assign svgsplit = svg | split: 'svg11.dtd">' %}
{% assign svgpart = svgsplit[1] | replace_first:'svg11.dtd">','' %}
{{ svgpart }}
                    </div>
```

to replace

```html
                            <object data="img/portfolio/{{ post.svg }}" type="image/svg+xml"  class="img-responsive" >
                                <img src="img/portfolio/{{ post.img }}" class="img-responsive" alt="{{ post.alt }}">
                            </object>
```



node ~/src/db/WebScratchpad/node-server.js
