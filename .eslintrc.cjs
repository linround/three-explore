/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    'semi': ['error', 'never'], // 分号禁止
    'quotes': ['error', 'single'], // 使用单引号
    'no-param-reassign': ['error',{'props': false}], // 不要直接给函数参数赋值.可修改参数属性
    'prefer-spread': 'error', // 使用扩展语法来调用可变参数的函数.
    'function-paren-newline': ['error', { 'minItems': 3, }], // 参数超过3个时换行
    'arrow-spacing': ['error', { 'before': true, 'after': true, }], // 箭头函数的前后空格
    'arrow-parens': ['error', 'always'], // 为了清晰和一致，始终在参数周围加上括号  最小化修改后的差异
    'arrow-body-style': ['error', 'as-needed'], // 将头函数的返回必要时用大括号包裹
    'no-confusing-arrow': 'error', // 避免混淆箭头（=>）和符号（=> <=）
    'implicit-arrow-linebreak': ['error', 'beside'], // 隐式返回时在箭头同行，右大括号包裹时换行
    /**
     * 对于class的一些见解
     */
    // 尽量使用class语法代替原型语法 类语法更简洁，更容易推理
    // 使用 extends进行继承 这是一种自建的方式继承原型的功能，从而不破换原型链
    // 方法中还回this，从而实现链式调用
    // 在类中定义原型方法，从而也避免了对于原型原有方法的副作用
    'no-useless-constructor': 'error', // 类中避免无效的 constructor
    'no-dupe-class-members': 'error', // 类中避免重复定义方法
    // 'class-methods-use-this': 'error', // 类中不使用this的方法应该定义为 static ；使用this的方法 定义为正常属性
    // 关于模块的见解
    // 不要使用通配符导入 确保上个模块有默认导出
    // 不要直接从导入中导出 尽管单线很简洁，但有一种清晰的导入方式和一种清晰的导出方式会使事情保持一致
    // 在模块中 只有一个导出时，首选默认导出不使用命名导出
    // 将所有导入置于非导入语句之上 由于导入已提升，因此将它们全部放在顶部可防止出现意外行为
    'no-duplicate-imports': 'error', // 仅仅从一个地方导入  因为同一路径导入多行会使代码维护困难
    // 不要导出可变的值， 通常导出一个引用来处理这些问题
    'object-curly-newline': ['error', { 'ImportDeclaration': { 'multiline': true, 'minProperties': 3, }, 'ExportDeclaration': 'never', }], // 导入3个及以上应该像多行数组和对象文字一样缩进,导出不换行
    // 不要使用for--of  for --in去迭代数组。尽量使用源方法
    // 尽量不用生成器
    'generator-star-spacing': ['error', { 'before': false, 'after': true, }], // 使用生成器,去报正确间隔, * 应该在函数这边
    'dot-notation': 'error', // 使用属性时，使用点语法  访问带有变量的属性时使用括号表示法
    // 计算幂时使用幂运算符**
    'prefer-const': 'error',


    // var 一行申明多个变量 const 和 let 不要这样做 以这种方式添加新的变量声明更容易，而且您永远不必担心换出 ;
    // 对于 a ，或引入仅标点符号的差异。您还可以使用调试器单步执行每个声明，而不是一次跳过所有声明
    'one-var': ['error', { var: 'always', let: 'never', const: 'never', }],
    // 写代码时 使用let 和 const 申明的变量放在合适的地方
    'no-multi-assign': 'error', // 不要链式创建变量  链接变量赋值创建隐式全局变量
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true, }], // 避免使用一元增量或减量，在for循环中可用 不允许一元递增和递减语句还可以防止您无意中预递增/预递减值，这也可能导致程序中出现意外行为
    'operator-linebreak': ['error', 'after'], //避免在赋值之前或之后的换行符。如果您的分配违反了 max-len，请将值括在括号中
    'no-unused-vars': 'error', // 没有使用的声明报错
    //ar 声明被提升到最接近的封闭函数范围的顶部，但它们的赋值不会。 const 和 let 声明拥有一个名为 Temporal Dead Zones (TDZ) 的新概念。重要的是要知道为什么 typeof 不再安全
    // 匿名函数表达式会提升它们的变量名，但不会提升函数赋值
    // 命名函数表达式提升变量名，而不是函数名或函数体
    // 函数声明提升它们的名称和函数体
    'eqeqeq': 'error', // 使用全等
    // 强制类型转换规则如下
    /**
     * Objects evaluate to true
     * Undefined evaluates to false
     * Null evaluates to false
     * Booleans evaluate to the value of the boolean
     *
     * Numbers evaluate to false if +0, -0, or NaN, otherwise true
     * Strings evaluate to false if an empty string '', otherwise true
     */
    // 判断布尔时 数字和字符串与真实的值直接进行比较
    'no-case-declarations': 'error',  // 词法声明在整个 switch 块中是可见的，但仅在分配时才被初始化，这仅在达到其大小写时发生。当多个 case 子句尝试定义同一事物时，这会导致问题
    'no-nested-ternary': 'error', // 三元组不应嵌套，通常是单行表达式
    'no-unneeded-ternary': 'error', // 避免不必要的三元语句
    // const bar = a + b / c * d;
    'no-mixed-operators': 'error', // 混合运算符时，请将它们括在括号中。唯一的例外是标准算术运算符：+、- 和 **，因为它们的优先级已被广泛理解。我们建议将 / 和 * 括在括号中，因为它们的优先级在混合时可能不明确
    'nonblock-statement-body-position': ['error', 'beside'], // 对所有多行块使用大括号
    'brace-style': 'error', //如果您在 if 和 else 中使用多行代码块，请将 else 与 if 代码块的右大括号放在同一行
    'no-else-return': 'error',   // 如果 if 块总是执行 return 语句，则后续的 else 块是不必要的。包含 return 的 if 块之后的 else if 块中的 return 可以分成多个 if 块
    /**
     * Control Statements
     */
    // 如果您的控制语句（if、while 等）过长或超过最大行长度，则可以将每个（分组）条件放入新行。逻辑运算符应该开始该行
    // 在行首要求操作符使操作符保持对齐并遵循类似于方法链接的模式。这还通过使视觉上更容易遵循复杂逻辑来提高可读性
    // 不要使用选择运算符代替控制语句
    /**
     * 注释
     *
     */
    //使用 /** ... */ 进行多行注释
    // 使用 // 单行注释。将单行注释放在注释主题上方的换行符上。除非它在块的第一行，否则在注释前放置一个空行
    // 所有注释都以空格开头，以便于阅读
    // 使用 FIXME 或 TODO 为您的评论添加前缀有助于其他开发人员快速了解您是在指出需要重新审视的问题，还是在建议需要实施的问题的解决方案。这些与常规评论不同，因为它们是可操作的
    // 使用 // TODO: 注释问题的解决方案
    // 使用 // FIXME: 注释问题。
    'indent': ['error', 2], // 制表符设置为两个空格
    'space-before-blocks': 'error', // 大括号前一个空格
    'keyword-spacing': ['error', { 'before': true, }], // 在控制语句（if、while 等）的左括号前放置 1 个空格。在函数调用和声明中，参数列表和函数名之间不要有空格
    'space-infix-ops': 'error', // 用空格隔开运算符
    'eol-last': ['error', 'always'], // 以单个换行符结束文件
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1, }], // 制作长方法链（超过 1 个方法链）时使用缩进。使用前导点，强调该行是方法调用，而不是新语句
    //在块之后和下一条语句之前留一个空行
    // 'padded-blocks': ['error', 'never'],// 不要用空行填充你的块
    // 'no-multiple-empty-lines': ['error', { 'max': 0, 'maxEOF': 0 }], // 不使用空行来填充代码
    'space-in-parens': ['error', 'never'], // 括号内不使用空格
    'array-bracket-spacing': ['error', 'never'], // 不要在数组括号内添加空格
    'object-curly-spacing': ['error', 'always'], // 在花括号内添加空格
    'max-len': ['error', { 'code': 1800, }], // 避免超过 1800 个字符（包括空格）的代码行。注意：根据上述，长字符串不受此规则的约束，不应分解
    'comma-spacing': ['error', { 'before': false, 'after': true, }], // 避免逗号前有空格，并要求逗号后有空格
    'computed-property-spacing': ['error', 'never', { 'enforceForClassMembers': true, }], // 在计算的属性括号内强制无间距
    'func-call-spacing': ['error', 'never'], // 避免函数及其调用之间的空格
    'key-spacing': ['error', { 'afterColon': true, }], // 在对象文字属性中强制键和值之间的间距
    'no-trailing-spaces': 'error', // 避免在行尾出现尾随空格
    'comma-style': ['error', 'last'], // 前导逗号：不
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }], // 对象附加的尾随逗号

    'radix': 'error', // 使用 Number 进行类型转换，使用 parseInt 始终使用基数来解析字符串
    'no-new-wrappers': 'error',
    /**
     * const a = ''
     * const b = a >> 0
     * console.log(b)
     *
     * 有时候使用移位转换能提高性能，但是通常最好加上注释，以便知道使用移位的目的
     */


    // 'id-length': 'error', // 避免使用单个字母的名称。描述你的命名
    'camelcase': ['error'], //命名对象、函数和实例时使用 camelCase
    'new-cap': ['error', { 'newIsCap': true, }], // 仅在命名构造函数或类时使用 PascalCase

    // JavaScript 在属性或方法方面没有隐私的概念。尽管前导下划线是表示“私有”的常用约定，
    // 但实际上，这些属性是完全公开的，因此是公共 API 合同的一部分。
    // 这种约定可能会导致开发人员错误地认为更改不会被视为破坏，或者不需要测试。
    'no-underscore-dangle': 'error',
    // 不要保存对this的引用。使用箭头函数或bind
    // 基本文件名应与其默认导出的名称完全匹配
    // 导出默认函数时使用 camelCase。您的文件名应该与您的函数名相同
    // 导出构造函数/类/单例/函数库/裸对象时使用 PascalCase
    // 首字母缩写词和首字母缩写词应始终全部大写或全部小写  名称是为了便于阅读，而不是为了计算机算法。
    // 您可以选择将常量大写，前提是它 (1) 已导出，(2) 是一个常量（不能重新分配），并且 (3) 程序员可以相信它（及其嵌套属性）永远不会改变


    // 标准
    // TODO
    // bad
    // isNaN('1.2'); // false
    // isNaN('1.2.3'); // true
    //
    // // good
    // Number.isNaN('1.2.3'); // false
    // Number.isNaN(Number('1.2.3')); // true
    //使用 Number.isNaN 而不是全局 isNaN 全局 isNaN 将非数字强制转换为数字，任何强制转换为 NaN 的都返回 true。如果需要此行为，请明确说明
    //使用 Number.isFinite 而不是全局 isFinite
    'no-restricted-globals': [
      'error',
      {
        'name': 'isNaN',
        'message': 'Use local parameter instead.',
      },
      {
        'name': 'isFinite',
        'message': 'Do not commit fdescribe. Use describe instead.',
      }
    ],
  },
}
