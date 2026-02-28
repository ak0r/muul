<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          body {
            font-family: system-ui, sans-serif;
            max-width: 720px;
            margin: 0 auto;
            padding: 2rem 1rem 4rem;
            color: #100F0F;
            background: #FFFCF0;
            line-height: 1.6;
          }
          @media (prefers-color-scheme: dark) {
            body { background: #100F0F; color: #FFFCF0; }
            a { color: #3AA99F; }
            .meta { color: #878580; }
            .item { border-color: #282726; }
          }
          header { margin-bottom: 2.5rem; }
          header p { color: #878580; font-size: 0.875rem; margin-top: 0.5rem; }
          h1 { font-size: 1.5rem; margin: 0 0 0.25rem; }
          h2 { font-size: 1rem; margin: 0 0 0.25rem; font-weight: 600; }
          a { color: #24837B; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .badge {
            display: inline-block;
            font-size: 0.7rem;
            padding: 0.15rem 0.5rem;
            border: 1px solid #E6E4D9;
            border-radius: 999px;
            color: #878580;
            margin-bottom: 1rem;
          }
          .item {
            padding: 1.25rem 0;
            border-bottom: 1px solid #E6E4D9;
          }
          .meta {
            font-size: 0.8rem;
            color: #878580;
            margin-top: 0.25rem;
          }
          .description {
            font-size: 0.875rem;
            margin-top: 0.5rem;
            color: #575653;
          }
          @media (prefers-color-scheme: dark) {
            .badge { border-color: #282726; }
            .item { border-color: #282726; }
            .description { color: #B7B5AC; }
          }
        </style>
      </head>
      <body>
        <header>
          <p class="badge">RSS Feed</p>
          <h1><a>
            <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
            <xsl:value-of select="/rss/channel/title"/>
          </a></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <p>Subscribe by copying the URL from your browser into your RSS reader.</p>
        </header>

        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2><a>
              <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
              <xsl:value-of select="title"/>
            </a></h2>
            <p class="meta"><xsl:value-of select="pubDate"/></p>
            <xsl:if test="description != ''">
              <p class="description"><xsl:value-of select="description"/></p>
            </xsl:if>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
