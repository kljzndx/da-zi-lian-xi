import { useEffect } from "react";
import classNames from "classnames";
import "./WordItem.css";
import symbolZhToEn from "../assets/symbolZhToEn.json"
import dualping from "../models/dualping";

/**
 * @callback onClickCallback
 * @param {int} itemId
 * 
 * @function
 * @param {{id:int, code:string, word:string, selectedId:int, inputingCode:string, dualMap:object, onCodeCleaned:Function, onClick:onClickCallback}} param0 
 */
function WordItem({ id, code, word, selectedId, inputingCode, dualMap, onCodeCleaned, onClick }) {

    let cd = code.toLowerCase()
    let ic = inputingCode.toLowerCase()

    const dualBlock = dualMap == null ? null : dualping.parseDualPing(dualMap, cd);
    
    if (dualBlock != null)
        cd = dualBlock.left.dualCode + (code == word ? "" : dualBlock.right.dualCode);
    
    if (code == word) {
        /** @type {{zh:string, en:string}[]} */
        const symbols = symbolZhToEn

        cd = symbols.find(sb => sb.zh == cd)?.en ?? cd
        ic = symbols.find(sb => sb.zh == ic)?.en ?? ic
    }

    const isThisCleaned = selectedId == id && ic.length >= cd.length && ic.startsWith(cd)
    const isPass = selectedId > id || isThisCleaned
    const isWrong = selectedId == id && ic != "" && !cd.startsWith(ic.substring(0, cd.length))

    useEffect(() => {
        if (isThisCleaned)
            onCodeCleaned?.()
    })

    /**
     * 
     * @param {int} place 
     */
    function getIsLetterRight(place) {
        if (ic.length > place)
            return cd[place] == ic[place]
        else return null
    }

    /**
     * 
     * @param {int} place 
     * @returns
     */
    function getLetterStyle(place) {
        const rightStyle = "text-green-500"
        const wrongStyle = "text-red-500"

        if (selectedId > id) return rightStyle
        if (selectedId == id) {
            const isRight = getIsLetterRight(place)
            if (isRight != null)
                return isRight == true ? rightStyle : wrongStyle

        }

        return ""
    }

    function getBgColor() {
        if (isPass) return "bg-green-200"
        if (isWrong) return "bg-red-300"
        if (selectedId == id) return "item-activities"

        return "bg-white"
    }

    return (
        <li className={classNames("w-16 min-h-16 max-h-20 border border-black text-center my-auto cursor-pointer", getBgColor())} onMouseUp={()=>onClick(id)}>
            <div>
                {Array.from(cd).map((str, index) => <span className={getLetterStyle(index)} key={index}>{str == " " ? "空格" : str}</span>)}
            </div>

            {dualBlock != null &&
                <div className="text-xs">
                    <span className={getLetterStyle(0)}>{dualBlock.left.fullCode}</span>
                    <span className={getLetterStyle(1)}>{dualBlock.right.fullCode}</span>
                </div>
            }

            <div className={classNames("text-2xl", { "text-green-500": isPass })}>
                {word}
            </div>
        </li>
    )
}

export default WordItem