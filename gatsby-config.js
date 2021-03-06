require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

const autoprefixer = require(`autoprefixer`);
const proxy = require(`http-proxy-middleware`);
const tailwindCss = require(`tailwindcss`)(`./tailwind.config.js`);

function trackingPlugins() {
  const plugins = [];

  if (process.env.GATSBY_BUGHERD_ID) {
    plugins.push({
      resolve: `gatsby-plugin-bugherd`,
      options: {
        key: process.env.GATSBY_BUGHERD_ID
      }
    });
  }

  if (process.env.GATSBY_GA_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_ID,
        head: true,
        anonymize: true
      }
    });
  }

  if (process.env.GATSBY_GTAG_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GTAG_ID,
        includeInDevelopment: true,
        defaultDataLayer: {
          platform: `gatsby`
        }
      }
    });
  }

  if (process.env.GATSBY_FBPIXEL_ID) {
    plugins.push({
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.GATSBY_FBPIXEL_ID
      }
    });
  }

  if (process.env.GATSBY_HOTJAR_ID && process.env.GATSBY_HOTJAR_VERSION) {
    plugins.push({
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: process.env.GATSBY_HOTJAR_ID,
        sv: process.env.GATSBY_HOTJAR_VERSION
      }
    });
  }

  return plugins;
}

//

module.exports = {
  developMiddleware: app => {
    app.use(
      `/.netlify/functions/`,
      proxy({
        target: `http://localhost:9000`,
        pathRewrite: {
          "/.netlify/functions/": ``
        }
      })
    );
  },
  siteMetadata: {
    title: `Mud`,
    titleTemplate: `%s - Mud`,
    description: `Mud is...`,
    keywords: `Site,keywords`,
    author: `danielcourtness@gmail.com`,
    url: ``,
    image: `/images/site-image.svg`,
    twitterUsername: `@twitter`
  },
  plugins: [
    ...trackingPlugins(),
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mud`,
        short_name: `mud`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/images/favicon.ico`
      }
    },
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [``],
    //     display: `block`
    //   }
    // },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [autoprefixer, tailwindCss]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        whitelistPatterns: [
          /gatsby-/,
          /glide/,
          /grid-/,
          /transition-/,
          /opacity-/,
          /top-0/,
          /right-0/,
          /bottom-0/,
          /left-0/,
          /visible/,
          /hidden/,
          /v1/,
          /v2/,
          /f1/,
          /f2/,
          /f3/,
          /f4/,
          /b1/,
          /b2/,
          /py-/,
          /mb-/,
          /mt-/
        ]
      }
    },
    // `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
        name: `images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/uploads`,
        name: `uploads`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 968,
              sizeByPixelDensity: true,
              withWebp: true
            }
          },
          `gatsby-remark-lazy-load`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/static`
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/src/lambda`,
        functionsOutput: `${__dirname}/lambda`
      }
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-headers`,
      options: {
        headers: {
          "/*": [`X-Frame-Options: ALLOW-FROM https://wjohnston.dev`]
        }
      }
    }
  ]
};
