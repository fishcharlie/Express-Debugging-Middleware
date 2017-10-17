# [Express-Debugging-Middleware](https://blog.charlie.fish/debug-express-middleware/)
## [Tutorial - How to Debug Express Middleware](https://blog.charlie.fish/debug-express-middleware/)

[Express.js](https://expressjs.com) is a great web framework to easily create web applications. One of the amazing features of Express.js is the ability to use middleware. This allows certain actions to be run on all incoming requests to the server. For example this can be used to verify a user is logged in, or to keep logs of all requests, or to parse JSON into the correct format before handling it, or many other things. Almost every Express.js application I have built uses some middleware to help handle various tasks.

One of the hard things about middleware is debugging where problems took place. In this post I will be describing how I debug Express.js middleware to detect where problems took place.

As my starting point I'll use the following code.

```
app.use(failingMiddleware);
app.use(successfulMiddleware);
app.get("/", function(req, res) {
    res.send("Success");
});
```

Now in most situations you don't know where the request is failing. It could be failing after the first middleware or it could be failing after the second. This case is pretty obvious since I named the two middleware functions `failingMiddleware` and `successfulMiddleware`.

So in the case you don't know where it is failing I use the following code to start trying to figure out why the request isn't receiving a response.

    app.use(function (req, res, next) {
        console.log("After middleware X working");
        next();
    });

I normally replace the `X` with a number and increment it in order after each middleware. So I would run this code after each middleware and see that when going to `/` it doesn't even print `After middleware 1 working`. So therefor `failingMiddleware` is the one with the problem.

In this case since I built the middleware for this example the problem is that it wasn't calling the `next()` function to continue to the next middleware.

I have posted the [source code](https://github.com/fishcharlie/Express-Debugging-Middleware) on my GitHub if you are curious the exact code and a larger example for this.

I have also built a super simple open source [middleware wrapper](https://www.npmjs.com/package/express-middleware-log) for this code that is much cleaner. This package, [express-middleware-log](https://www.npmjs.com/package/express-middleware-log) will be mantained and managed by my company [rrainn](https://rrainn.com). You can find the source code for this package on [GitHub](https://github.com/rrainn/express-middleware-log).

You can just install from npm.

    npm install --save express-middleware-log

Then require it in your application.

    var logger = require("express-middleware-log");

Then instead of the code above just use my [express-middleware-log](https://www.npmjs.com/package/express-middleware-log).

    app.use(logger("After middleware X working"));
    
Hopefully this helped you learn how to debug Express.js middleware.

Feel free to use my [contact page](https://blog.charlie.fish/contact/) if you have any questions. You can also create an [issue](https://github.com/rrainn/express-middleware-log/issues) or [pull request](https://github.com/rrainn/express-middleware-log/pulls) on [express-middleware-log](https://www.npmjs.com/package/express-middleware-log).
