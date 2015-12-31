import {transform} from 'babel-core'
import assert from 'assert'

import moduleProvider from '../src'

const strip = (str) => str.replace(/[\t\n\r ]+/g, '')

const assertSame = (actual, expected) =>
  assert.strictEqual(strip(actual), strip(expected))

let compile

describe('module-provider', () => {

  beforeEach(() => {
    compile = (code, modules) => transform(code, {
      presets: [],
      plugins: [
        [moduleProvider, modules]
      ]
    }).code
  })

  it('should add a default import statement', done => {

    const modules = {
      "hello": "Hello"
    }

    const actual = compile('const hello = "hello"', modules)

    const expected = `
      import Hello from "hello";
      const hello = "hello";
    `
    assertSame(actual, expected)
    done()
  })

  it('should add non default import', done => {

    const modules = {
      "hello": ["Hello"]
    }

    const actual = compile('const hello = "hello"', modules)

    const expected = `
      import {Hello} from "hello";
      const hello = "hello";
    `

    assertSame(actual, expected)
    done()

  })

  it('should add multiple non-default imports', done => {

    const TAG_NAMES = [
      'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
      'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
      'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
      'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
      'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
      'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
      'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt',
      'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span',
      'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot',
      'th', 'thead', 'title', 'tr', 'u', 'ul', 'video'
    ];

    const modules = {
      "@motorcycle/dom": TAG_NAMES
    }

    const actual = compile('const hello = "hello"', modules)

    const expected = `
      import {a, abbr, address, area, article, aside, audio, b, base,
      bdi, bdo, blockquote, body, br, button, canvas, caption,
      cite, code, col, colgroup, dd, del, dfn, dir, div, dl,
      dt, em, embed, fieldset, figcaption, figure, footer, form,
      h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html,
      i, iframe, img, input, ins, kbd, keygen, label, legend,
      li, link, main, map, mark, menu, meta, nav, noscript,
      object, ol, optgroup, option, p, param, pre, q, rp, rt,
      ruby, s, samp, script, section, select, small, source, span,
      strong, style, sub, sup, table, tbody, td, textarea, tfoot,
      th, thead, title, tr, u, ul, video} from "@motorcycle/dom";
      const hello = "hello";
    `

    assertSame(actual, expected)
    done()

  })
})
