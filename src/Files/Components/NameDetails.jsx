import React, { useEffect, useState } from 'react'

export const NameDetails = () => {
    const [toggel, setToggel] = useState(true)
    const [name, setname] = useState(() => {
        let value = localStorage.getItem("name") || "Right Click here";
        if (value !== "Right Click here") {
            setToggel(false)
        }
        return value
    })
    const handleSubmit = (e) => {
        e && e.preventDefault();
        if (name.trim().length < 1) {
            return
        } else {
            handleToggle()
        }
    }
    const handleToggle = (e) => {
        e && e.preventDefault();
        setToggel(!toggel);
    }
    useEffect(() => {
        localStorage.setItem("name", name)
    }, [name])
    let { usermessage } = status(new Date().getHours())
    return (
        <div style={{ margin: "10px auto" ,userSelect:"none"}}>
            {toggel ?
                <div>
                    <form action="" onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                        <label htmlFor="userName" className='label01'>Enter Your Name</label>
                        <input type='text' id='username' value={name} className='text02'
                            onChange={(e) => setname(e.target.value.length <=10 ? e.target.value : name)} />
                        <button className='btn02' onClick={handleSubmit}>Enter</button>
                    </form>
                </div>
                :
                <div onContextMenu={(e) => handleToggle(e)}
                    style={{ width: "300px", fontSize: "1.25rem", padding: "1rem",
                    whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",cursor:"pointer"
                }}
                >{usermessage}  {name}</div>}
        </div>
    )
}
function status(h) {
    let session = h <= 12 ? "AM" : "PM";
    let bg
    let usermessage;

    if (h < 8 && session === "AM") {
        bg = `url(https://source.unsplash.com/tUigI-EE8_s)`;
        usermessage = `Good Morning`;
    }
    else if (h <= 12 && session === "AM") {
        bg = `url(https://source.unsplash.com/RlQ29vvbU2Q)`;
        usermessage = `Have a Good Day`;
    }
    else if (h < 14 && session === "PM") {
        bg = `url(https://source.unsplash.com/OCXR3-aU4Ss)`;
        usermessage = `Good Afternoon`;
    }
    else if (h < 20 && session === "PM") {
        bg = `url(https://source.unsplash.com/ZBD7Wh3SJEI)`;
        usermessage = `Good Evening`;
    }
    else {
        bg = `url(https://source.unsplash.com/zfJMDR-btBg)`;
        usermessage = `Good Night`;
    }
    return { bg, usermessage };
}