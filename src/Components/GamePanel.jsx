import { useEffect, useState } from 'react'
import WordItem from './Worditem'

import map_xiaohe from '../assets/dualping-xiaohe.json'
import map_ziranma from '../assets/dualping-ziranma.json'

/**
 * @param {{data:Array<{code:string, word:string}>, needReset:boolean, onReseted:Function, onAllCleaned:Function}} param0 
 */
function GamePanel({ data, needReset, onReseted, onAllCleaned }) {
  const [nowInputing, setNowInputing] = useState("")
  const [selectedId, setSelectedId] = useState(0)
  const [isSubmitBySpace, setIsSubmitBySpace] = useState(true)
  const [dualMap, setDualMap] = useState(null);

  useEffect(() => {
    if (needReset) {
      if (selectedId != 0)
        setSelectedId(0)

      if (nowInputing != "")
        setNowInputing("")

      if (selectedId == 0 && nowInputing == "")
        onReseted?.()
    }

  })

  function setSlctId(id) {
    setSelectedId(id)
    setNowInputing("")

    const isAllCleaned = selectedId >= data.length - 1;
    if (isAllCleaned) {
      onAllCleaned?.()
    }
  }

  function onCodeCleaned() {
    if (isSubmitBySpace) {
      let needReturn = false

      // 拦截规则
      if (!nowInputing.endsWith(" ")) needReturn = true
      // 放行规则
      if (data[selectedId].code == data[selectedId].word) needReturn = false

      if (needReturn) return
    }

    setSlctId(selectedId + 1)
  }

  return (
    <div>
      <div className='flex justify-between py-4'>
        <div className=''>
          <input className='px-2' type="text" placeholder='请在这里进行打字' value={nowInputing} onKeyUp={e => { if (e.code == "Enter") setSlctId(selectedId + 1) }} onChange={e=>setNowInputing(e.target.value)} />

          <label className='mx-4'>
            <input className='mx-1' type="checkbox" checked={isSubmitBySpace} onChange={e=>setIsSubmitBySpace(e.target.checked)} />
            使用空格切换下一单字
          </label>
        </div>

        <div className='flex gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <div className='w-4 h-4 bg-green-400 border-2 border-black'></div>
            <div>已打单字</div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='w-4 h-4 bg-blue-400 border-2 border-black'></div>
            <div>当前单字</div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='w-4 h-4 bg-white border-2 border-black'></div>
            <div>未打单字</div>
          </div>
        </div>
      </div>

      <div className='pb-4 flex gap-x-2'>
        <p>双拼模式：</p>
        <label>
          <input type="radio" name='dualMap' checked={dualMap == null} onChange={e => setDualMap(null)} />
          禁用
        </label>
        <label>
          <input type="radio" name='dualMap' checked={dualMap == map_xiaohe} onChange={e => setDualMap(map_xiaohe)} />
          小鹤双拼
        </label>
        <label>
          <input type="radio" name='dualMap' checked={dualMap == map_ziranma} onChange={e => setDualMap(map_ziranma)} />
          自然码双拼
        </label>
      </div>

      <ul className='flex flex-wrap'>
        {data?.map((it, id) => <WordItem key={id} id={id} code={it.code} word={it.word} inputingCode={nowInputing} selectedId={selectedId} onCodeCleaned={onCodeCleaned} onClick={id => setSlctId(id)} />)}
      </ul>
    </div>
  )
}

export default GamePanel
