import { pinyin } from 'pinyin-pro';
import { useState } from 'react'

/**
 * 
 * @callback onParsedCallback
 * @param {{code:string, word:string}[]} data
 * 
 * @function
 * @param {object} props 
 * @param {onParsedCallback} props.onParsed 
 */

export default function ParsingPanel({ onParsed }) {

  const [text, setText] = useState("");

  function ParseText() {
    const mtext = text.replace(/[\r\n]/g, " ")
    
    const strArr = Array.from(mtext)
    const pinyinArr = pinyin(mtext, { toneType: "none", type: "array", nonZh: "spaced" })

    /** @type {{code:string, word:string}[]} */
    let result = []

    for (let i = 0; i < strArr.length; i++) {
      const source = strArr[i];
      const pinyin = pinyinArr[i].replace("ü", "v");

      result.push({ code: pinyin, word: source })
    }
    onParsed?.(result)
    setText("")
  }

  return (
    <div className=''>
      <textarea className='block w-[40rem] h-52 resize-none p-2 mx-auto' value={text} placeholder="请输入文本" onChange={e => setText(e.target.value)} />
      <button className="btn btn-blue block mx-auto my-3" onClick={e => ParseText()}>
        提交
      </button>
    </div>
  )
}
