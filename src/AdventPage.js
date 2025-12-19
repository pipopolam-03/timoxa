import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AdventPage.css";

const days = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, '⭐'];

const daysContent = {
    21: {
        title: "21 декабря",
        img: "21.gif",
        text: "Ха! Любопытный, здесь еще ничего нет, только мяу",
    },
    22: {
        title: "22 декабря",
        img: "22.webp",
        text: "Здесь тоже еще ничего нет!",
    },
    23: {
        title: "23 декабря",
        img: "23.webp",
        text: "Ко мне обращаешься? Еще же не 23",
    },
    24: {
        title: "24 декабря",
        img: "24.webp",
        text: "Могу предложить натуру. Подарок только в среду",
    },
    25: {
        title: "25 декабря",
        img: "25.webp",
        text: "Подарка ещё нет, есть только",
    },
    26: {
        title: "26 декабря",
        img: "26.webp",
        text: "Пока могу порадовать только комплиментом",
    },
    27: {
        title: "27 декабря",
        img: "27.gif",
        text: "Этот сигма решил посмотреть все ячейки",
    },
    28: {
        title: "28 декабря",
        img: "28.gif",
        text: "Ой, фронталка открылась",
    },
    29: {
        title: "29 декабря",
        img: "29.webp",
        text: "",
    },
    30: {
        title: "30 декабря",
        img: "30.webp",
        text: "Стас лазает по закрытым ячейкам",
    },
    31: {
        title: "31 декабря",
        img: "31.webp",
        text: "",
    },
    '⭐': {
        title: "⭐",
        img: "32.webp",
        text: "",
    },
};


export default function AdventPage() {
    const [openDay, setOpenDay] = useState(null);

    return (
        <>
            <div className="snow" />

            <div className="page">
                <img src="/gif.gif" alt="gif" className="gif" />

                <motion.h1
                    className="title"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    💌 Подарки от котика 💌
                </motion.h1>

                <div className="grid">
                    {days.map((day) => (
                        <button
                            key={day}
                            className="day"
                            onClick={() => setOpenDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {openDay && daysContent[openDay] && (
                        <motion.div
                            className="overlay"
                            onClick={() => setOpenDay(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="modal modal-day"
                                onClick={(e) => e.stopPropagation()}
                                initial={{scale: 0.8}}
                                animate={{scale: 1}}
                                exit={{scale: 0.8}}
                            >
                                <span className="close" onClick={() => setOpenDay(null)}>✖</span>

                                <h1>{daysContent[openDay].title}</h1>
                                <h2>{daysContent[openDay].text}</h2>
                                <img src={daysContent[openDay].img} alt=""/>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </>
    );
}
