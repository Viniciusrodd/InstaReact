
import './Message.css';

const Message = ({ msg, type }) => {
    return (
        <div className={`message ${type}`}>
            {
                Array.isArray(msg) 
                    ? msg.map((line, id) =>(
                        <p key={ id }>{ line }</p>
                    ))
                    : typeof msg === 'string'
                        ? msg.split('...').map((line, id) =>(
                            <p key={id}>{ line }</p>
                        ))
                        : null
            }
        </div>
    );
};

export default Message;
