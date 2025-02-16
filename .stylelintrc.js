module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    // 1.0 Általános követelmények
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'indentation': 2,

    // 3.1 Selector nevezéktan és formázás
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
    'selector-id-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'selector-max-id': 0, // ID szelektorok tiltása
    'selector-no-qualifying-type': true, // HTML elemek közvetlen stílusozásának tiltása
    'selector-max-compound-selectors': 3,
    'selector-max-specificity': '0,3,0',

    // Property formázás
    'declaration-colon-space-after': 'always',
    'declaration-block-semicolon-newline-after': 'always',
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',

    // Változók és mixinek
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'scss/at-mixin-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // 5.2 Kerülendő gyakorlatok
    'declaration-no-important': true,

    // Üres sorok kezelése
    'rule-empty-line-before': [
      'always',
      {
        except: [ 'first-nested' ],
        ignore: [ 'after-comment' ],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: [ 'first-nested', 'blockless-after-blockless' ],
        ignore: [ 'after-comment' ],
      },
    ],

    // Property sorrend
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-radius',
      'background',
      'background-color',
      'color',
      'font-family',
      'font-size',
      'font-weight',
      'line-height',
      'text-align',
      'text-decoration',
      'transition',
    ],
  },
};
