import React from 'react'
import zxcvbn from 'zxcvbn'
function Indicador({password}) {
    const testResult=zxcvbn(password);
    const num = testResult.score*100/4;
    const Letrero=()=>{
        switch(testResult.score)
        {
            case 0:
                return 'Muy débil';
            case 1:
                return 'Débil';
            case 2:
                return 'Regular';
            case 3:
                return 'Bien';
            case 4:
                return 'Fuerte';
            default:
                return 'none';
        }
    }
    const color=()=>{
        switch(testResult.score)
        {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    }
    const changePasswordColor = () => ({
        width: `${num}%`,
        background: color(),
        height: '7px'
    })
    return (
        <>
            <div className="progress" style={{height:'7px'}}>
                <div className="progress-bar" style={changePasswordColor()}>

                </div>
            </div>
            <p style={{color:color()}}>{Letrero()}</p>
        </>
    );
}

export default Indicador;