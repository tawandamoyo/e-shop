# Prerequisites #
 
To get the most out of this readme and the exercises within it, you'll first need to some understanding of the following:
- How to build a fullstack application (Your work on [this project](https://github.com/js-lesson-repos/first-deep-slice) should be a good boilerplate)
 - How to build a browser interface using React
 - How to serve static resources using a Node.js server
 - How to send HTTP requests to your Node.js server from your browser interface
 - How to create a postgres database
 - How to establish a connection from your Node.js server to your postgres database
- How to write tests for your code (use [this repo](https://github.com/js-lesson-repos/testing-and-debugging) for reference)
- Why to use an [ORM](https://sequelize.org/docs/v6/getting-started/) / [query builder](https://knexjs.org/guide/) (use [this repo](https://github.com/js-lesson-repos/server-side-javascript-II-orms) for reference)
- Why to use [Redux](https://redux.js.org/introduction/installation) (use [this repo](https://github.com/js-lesson-repos/react-with-redux) for reference)
 
# From 30K ft. #
 
On a very basic level, you're learning to use computers to solve problems. That's valuable! And, as such, you should get paid to do so. That means following demand, and people demand stuff! So naturally your skills and the economy's desires are likely to intersect somewhere in the ballpark of eCommerce.
 
The eCommerce space is crowded, as such there are plenty of people that have abstracted away a lot of the normal concerns one bumps into trying to build an eCommerce site, even to the point that you can build your own without writing any code. Still, these concerns are worth learning to handle with code, since they apply to basically all businesses/applications.
 
Chiefly, the purpose of this project is to get used to dealing with users. Handling, storing, and delivering user data is a multifaceted challenge. Doing so at the level that a large company does involves technical, practical, and legal expertise. But no one person wears all hats, so you're going to learn to tackle some of the technical concerns:
 
- What data do I need? How should I structure/format my data?
- How do I manage a login flow?
- How do I manage a checkout flow?
- How do I make a search page?
- How do I reconcile conflicting data?
- How do I deliver a good user experience to customers?
 
# Specs #
 
Your task is to build an eCommerce site. For reference take a look at [Etsy](https://www.etsy.com). Don't look at Amazon.com. Amazon is a business success but it is gratuitously featured and a mess from a UX perspective. Nobody should emulate how their website looks/functions (_some_ of Amazon's functionality is **great**, but it's still a bad template).
 
Here are your specs in [MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) format.
 
## Must ##
 
### Technical ###
 
- Use Redux for state management
- Use a query builder or ORM to send requests to your DB from your server
- Use [Material UI](https://mui.com/material-ui/getting-started/usage/) (`npm install @mui/material`)
- <u>__HAVE TESTS!__</u>
  - test each case for your routes on the server side
  - test each major piece of functionality in your UI
 
### User Stories ###
 
- Support 3 tiers of users:
 - **Guests** can:
   - Search for products
   - See product information for each listing
   - Add/remove products to a cart
   - Refresh their browser window and still see their same cart
   - Sign up
   - Log in (to access their customer or seller account)
   - Preserve their cart after logging in (a guest's cart should probably be appended to the appropriate customer/seller cart when login or signup occurs)
 - **Customers** can:
   - Do everything a **Guest** can (except sign up)
   - Clear their browser cache and cookies and still access their cart
   - Check out
   - See their order history
   - Log out
   - "Delete" their account
 - **Sellers** can:
   - Do everything a **Customer** can
   - Upload their own products for sale
   - See a list of all their own products currently for sale
   - See the history of orders made for their listed products
   - "Delete" their account (what will happen to their listings when this happens?)
 
## Should ##
 
- Enable customers to upgrade their account to a seller account
- Enable sellers to downgrade their account to a customer account
- Show the historical listing information for an order in a user's order history (if a seller updates the price of a product, the old price should still appear in customers' order histories)
- Not show any product listing without a seller to fulfill that order
 
## Could ##
 
- Use OAuth (see more about this below) for login
- Allow users to change their username and password (if not using OAuth)
- Allow **Customers** and **Sellers** to reactivate "deleted" accounts
- Verify **Sellers'** emails when they sign up (or upgrade from a **Customer** account) using JWTs (JSON Web Tokens)
- Integrate Stripe for a true checkout with mock (fake) purchases. **If you decide to do this just make sure you never use your "live" API keys**
- Allow product ratings
- Allow product reviews
- Include coverage tests (100% standard)
 
## Wont ##
 
- Secure a user's login if you decide not to use OAuth
- Store CC information
- Comply with privacy regulations
- **Host/deploy your website publically**
 
# Filling some gaps #
 
In order to achieve some of these goals you'll need a bit more information.
 
Right on the outset I will say that managing the cart will be one of the trickier parts of this project. With some patience and careful planning you'll be able to handle it fine, it just requires use of cookies, which you haven't used as of yet. So let's start there.
 
## Cookies ##
 
If you've ever used the internet you must have heard of cookies. Large swaths of the world have regulations forcing companies to tell you when they are using them. Here is what they actually are:
 
An HTTP header.
 
Yep, that's what all the fuss is about. To be fair, it's a special header that enables servers and browsers to preserve information. If misused or misconfigured they can expose private information to malicious parties. And like anything useful, they can be abused. Thus all the fuss.
 
In order for you to take advantage of the power of cookies you'll need some more specific information about [how to use them](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). That link from MDN does a great job explaining it but I've provided a practical example using axios/express since those are the tools you're probably most familiar with. I'll urge you to investigate the contents of the `./cookieExample` dir to understand the rest.
 
There isn't much code to read. Read it carefully.
 
Also try closing your refreshing your page, and closing/reopening your browser window. Notice what happens to the cookie.
 
## Email verification ##
 
If you choose to employ email verification you should probably do so with JSON Web Tokens (JWT). You'll also need to send emails from your server (never from the browser).
 
The flow goes as such:
 
- A logged in user clicks a button/submits a form to initiate their email verification
- A request is sent to your server which subsequently constructs a JWT containing the user's email address
- The server sends an email to the user's alleged email address which includes the JWT, then responds to the user
- The user is told to check their email
- The user opens the email the server sent to them and copies the JWT (either manually or using a __magic link__) back into the website
- A second request is sent to the server, this time containing the JTW it just generated. If the server can decode it, then the server has verified the email address contained within it
 
FYI a magic link is a link with a JTW, or some other vital-usasually encrypted-information embedded in it as a query parameter. The way they work is you set up a page like `/verify_token` then direct someone there with a link with the following pattern: `www.mysite.com/verify_token?code=encryptedinfo`. The page, upon loading parser the query param `"encryptedinfo"` from the url and sends it back to the server.
 
With React this is normally done using `useEffect`, but it can be done however you'd like.
 
`"encryptedinfo"` gets decrypted by the server then the server responds with a redirect to either a success or failure page.
 
The "magic" is that the user only had to click a link 👍.
 
### JWT ###
 
JWTs use encryption to send sensitive information. They're primary use is to send an undecodable message to a user who can later redeem the message as verification/authentication.
 
To demonstrate how to use one of JS's more popular JWT libraries ([docs here](https://github.com/auth0/node-jsonwebtoken)) I've written a small demo in the `./jwtExample` dir. Run the file to see a JWT in action.
 
### Sending emails ###
 
There are many many services out there for sending emails. The thing is sending an email hinges on a different protocol than HTTP. Namely either IMAP, SMTP, or POP. Fun fact, all of which use TCP (including HTTP).
 
Protocols aside, you need a server specifically configured to send and receive emails. You're welcome to set one up yourself ([tutorial-1](https://nodemailer.com/about/), [tutorial-2](https://mailtrap.io/blog/setup-smtp-server/)), but my recommendation is to use a service that sends emails on your behalf.
 
For this my preferred solution is AWS's SNS. However, using it requires climbing the fairly steep learning curve of AWS. Instead I'm going to recommend the unfortunately named [MailSlurp](https://www.mailslurp.com/guides/getting-started/).
 
You will need to [sign up](https://app.mailslurp.com/sign-up/) with MailSlurp, which is standard for any service that could be used to send millions of spam messages by robots. I hate to recommend an inessential service that requires you to sign up, but this is likely your best option.
 
Use a burner email if you prefer not to give up your email address but make sure you have access to the inbox of whatever address you use to sign up. MailSlurp uses the magic link verification flow mentioned above (so you can see it in action).
 
**Warning:** Don't expose your MailSlurp API key. Keep it in a `secrets.json` file that you `.gitignore`, and only use it on your server side code.

## OAuth ##
 
I mentioned this above but couldn't provide a contextless link that would do you much good. So here's some context.
 
OAuth is an authentication method where you rely on a trusted third party to verify your user's identities.
 
If you've ever seen "log in with Google/Facebook/GitHub/etc." on a website, that is OAuth. Its advantages are many, but the primary ones in my opinion are that you can offload the responsibility of storing sensitive user data, and that you can offload some of the hassle of your login/signup flow. Here's how the flow works in brief:
 
![Oauth request flow diagram](https://docs.oracle.com/cd/E82085_01/160027/JOS%20Implementation%20Guide/Output/img/oauth2-caseflow.png)
 
Above the browser is the "BusinessClient", your server is the "ResourceServer", and the trusted third party is "OAuth Server".
 
That being said, you still need to manage your user's tokens with care.
 
There are a variety of packages that encapsulate the nitty-gritty details of OAuth for you, and that help you achieve OAuth strategies (the correct flows so that data stays secure). So in practice _using OAuth_ amounts to properly using one of those packages.
 
[Passport](https://www.passportjs.org/docs/) is among the most popular and best documented JS libraries for supporting OAuth. The setup is somewhat involved, though less so than setting up your own login/signup flow, so follow the docs carefully.

## Important considerations ##
 
- You will need to consider how a cart stored as a cookie gets reconciled with an existing customer cart, and what should happen to the cookie once it is.
- You will need to consider what the difference between an item in a cart and an item that has been ordered is (hint: not much)
- You will need to consider what happens to listed products when a seller deletes their account
- You should to need to consider what happens two customers with the same information try to sign up
 
...and much more!
 
<span style="color:red">Be sure not to contaminate your project with the</span> `*Example` <span style="color:red">dirs in this repo.</span>