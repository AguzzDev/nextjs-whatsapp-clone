export default function Message ({ key, user, message }) {
  return (
    <div>
      <p className={`chat-message ${true && 'chat-send'}`}>
        {message.message}
        <span className='flex items-end justify-end ml-3 text-xs text-gray-400' />
      </p>
    </div>
  )
}
