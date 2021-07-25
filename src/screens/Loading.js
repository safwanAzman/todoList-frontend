import React from 'react'

function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-pink-700">
            <h1 className="text-6xl font-semibold text-white animate-pulse">Todo-List...</h1>
        </div>
    )
}

export default Loading
