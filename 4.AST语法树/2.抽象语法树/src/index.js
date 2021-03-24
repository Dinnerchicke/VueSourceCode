import parse from './parse'
let templateStr = `
  <div>
    <h3>hello</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
    <div>
      <div>哈哈</div>
    </div>
  </div>
`
console.log(parse(templateStr))