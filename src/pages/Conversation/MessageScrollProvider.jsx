import { createContext, useContext, useRef } from "react";

const MessageScrollContext = createContext(null);

export const MessageScrollProvider = ({ children }) => {
    const scrollRef = useRef(null);
    const prevScrollHeight = useRef(0);
    const prevOffsetTop = useRef(0);

    const checkAutoScroll = () => {
        const currentScrollHeight = scrollRef.current.scrollHeight;
        const isAtBottom =
            scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            prevScrollHeight.current - 25;

        if (isAtBottom) {
            scrollToBottom();
        }

        prevScrollHeight.current = currentScrollHeight;
        prevOffsetTop.current = scrollRef.current.scrollTop;
    };

    const scrollToBottom = () => {
        const currentScrollHeight = scrollRef.current.scrollHeight;
        scrollRef.current.scrollTop = currentScrollHeight;
    };

    return (
        <MessageScrollContext.Provider value={{ scrollRef, checkAutoScroll, scrollToBottom }}>
            {children}
        </MessageScrollContext.Provider>
    );
};

export const useMessageScroll = () => {
    const context = useContext(MessageScrollContext);
    if (context === undefined) {
        throw new Error("useMessageScroll must be used within a MessageScrollProvider");
    }
    return context;
};
