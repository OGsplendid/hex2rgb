import { useState } from 'react'
// import { hex2rgb } from '../handlers/hex2rgb'

type THex2rgb = string;

const hex2rgb = (hexString: THex2rgb): string => {
    const bigint = parseInt(hexString.split('#')[1], 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}


interface IForm {
    text: string,
}

interface IColor {
    bgcolor: string,
    result: string,
}

export const Form = () => {


    const [color, setColor] = useState<IColor>({
        bgcolor: '#242424',
        result: '',
    });

    const [form, setForm] = useState<IForm >({
        text: '',
    });

    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev, 
            [name]: value,
        }))

        if (value.length < 7) return;

        if (/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(value)) {
            setColor(prev => ({
                ...prev,
                bgcolor: hex2rgb(value),
                result: hex2rgb(value),
            }));
        } else {
            setColor(prev => ({
                ...prev,
                bgcolor: 'red',
                result: 'error',
            }));
        }
    }

  return (
    <div style={{backgroundColor: color.bgcolor}} className='main-container'>
        <form onSubmit={e => e.preventDefault()}>
            <input onChange={onChange} type='text' name='text' value={form.text} />
        </form>
        <div className='result'>{color.result}</div>
    </div>
  )
}
