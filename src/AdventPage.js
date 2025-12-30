import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./AdventPage.css";

export default function RandomCountdown() {
    const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
    const [opened, setOpened] = useState(null); // '1' | '2' | null
    const [inputCode, setInputCode] = useState("");
    const [isCodeCorrect, setIsCodeCorrect] = useState(false);

    // случайный код для каждого купона
    const codes = { '1': '2912', '2': '8003' };

    useEffect(() => {
        const tick = () => {
            const h = String(Math.floor(Math.random() * 24)).padStart(2, "0");
            const m = String(Math.floor(Math.random() * 60)).padStart(2, "0");
            const s = String(Math.floor(Math.random() * 60)).padStart(2, "0");
            setTime({ h, m, s });
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const handleCodeCheck = () => {
        if (inputCode === codes[opened]) {
            setIsCodeCorrect(true);
        } else {
            setIsCodeCorrect(false);
            alert('Неверный код!');
        }
    };

    return (
        <div className="page">
            <motion.div
                className="timer-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
            >
                <h1 className="title">До основного подарка осталось: </h1>

                <div className="timer">
                    {[time.h, time.m, time.s].map((t, i) => (
                        <motion.div
                            key={i}
                            className="timer-box"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>

                <div className="coupons">
                    <button onClick={() => { setOpened('1'); setInputCode(''); setIsCodeCorrect(false); }} className="coupon-btn">
                        <img src="/kupon1.png" alt="Купон 1" />
                    </button>
                    <button onClick={() => { setOpened('2'); setInputCode(''); setIsCodeCorrect(false); }} className="coupon-btn">
                        <img src="/kupon2.png" alt="Купон 2" />
                    </button>
                </div>
            </motion.div>

            {opened && (
                <div className="modal-backdrop" onClick={() => setOpened(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-title">{opened === '1' ? 'Купон №1' : 'Купон №2'}</div>

                        {!isCodeCorrect ? (
                            <div>
                                <label htmlFor="code-input" style={{ display: 'block', marginBottom: '6px' }}>Введи код</label>
                                <input
                                    id="code-input"
                                    type="text"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                    style={{ padding: '8px', width: '100%', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                />
                                <button className="close-btn" onClick={handleCodeCheck}>Проверить код</button>
                            </div>
                        ) : (
                            <div>
                                <div className="modal-text">
                                    {opened === '1'
                                        ? '1000 рублей на погулять с Софой. Чтобы получить деньги, продиктуй код Стасу: ZHOPA228'
                                        : '1000 рублей на кастом комнаты. Чтобы получить деньги, продиктуй код Свете: GOVNO666'}
                                </div>
                                <button className="close-btn" onClick={() => setOpened(null)}>Закрыть</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}