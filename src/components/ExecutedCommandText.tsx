type ExecutedCommandTextProps = {
    text?: string
    type: string
}

export default function ExecutedCommandText({ text, type }: ExecutedCommandTextProps) {
    return (
        type == "command" ? (
            <span>C:\Users\Guest&gt; <span className='text-command'>{text}</span></span>
        ) : (
            <span>C:\Users\Guest&gt;</span>
        )
    )
}