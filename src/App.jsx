import { useEffect, useState } from 'react'
import './App.css'
import GamePanel from './Components/GamePanel'
import ParsingPanel from './Components/ParsingPanel'

function App() {
  const [allData, setAllData] = useState([]);
  const [pageList, setPageList] = useState([[]]);
  const [pageId, setPageId] = useState(0);
  const [pageData, setPageData] = useState([]);

  const [isStartGame, setIsStartGame] = useState(false);
  const [needRestart, setNeedRestart] = useState(false);

  useEffect(() => {if (allData.length > 0) setUpPageList()}, [allData])

  function setPage(pid, list = pageList) {
    setPageId(pid);
    setPageData(list[pid]);
    setNeedRestart(true);
  }

  function onAllCleaned() {
    if (pageId == pageList.length - 1) {
      console.log("已到底")
      return
    }

    setPage(pageId + 1);
  }

  function setUpPageList(){
    const data = allData;
    const pl = []
    let items = [];

    for (let id = 0; id < data.length; id++) {
      const it = data[id];
      items.push(it);

      if (items.length == 60) {
        pl.push(items)
        items = []
      }
    }

    if (items.length != 0)
      pl.push(items)

    setPageList(pl)
    setPage(0, pl)
  }

  /**
   * @param {{code:string, word:string}[]} data
   */
  function onParsed(data) {
    setAllData(data)
    setIsStartGame(true)
  }

  if (isStartGame) return (
    <div>
      <div className='text-2xl text-center py-2'>打字练习</div>

      <GamePanel data={pageData} needReset={needRestart} onReseted={() => setNeedRestart(false)} onAllCleaned={onAllCleaned} />
      
      <div className='flex justify-between my-3'>
        <div>
          <button className='btn btn-blue' onClick={() => setIsStartGame(false)}>返回</button>
        </div>
        
        <div className='flex items-center gap-x-2'>
          <button className='btn btn-blue' disabled={pageId == 0} onClick={() => setPage(0)}>首页</button>
          <button className='btn btn-blue' disabled={pageId == 0} onClick={() => setPage(pageId - 1)}>上一页</button>

          <span>{pageId + 1} / {pageList.length}</span>

          <button className='btn btn-blue' disabled={pageId >= pageList.length - 1} onClick={() => setPage(pageId + 1)}>下一页</button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className='text-2xl text-center py-2'>文字录入</div>
      <ParsingPanel onParsed={onParsed} />
    </div>
  )
}

export default App
