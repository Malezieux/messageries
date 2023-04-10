import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function UserForm() {
  const { register, handleSubmit, watch } = useForm();
  const [message, setMessage] = useState('');
  const onSubmit = async () => {
    const data = watch(); 
    const response = await fetch("http://localhost:8000/api/eleve", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message_send: data.message_send,
       
      }),
    });
    const jsonResponse = await response.json();
    setMessage(jsonResponse.message);
  };

  return (
  <>
     {message && <p>{message}</p>} 
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Message :
        <input {...register("message_send")} />
      </label>
     
      <button type="submit">Envoyer</button>
      </form>
      </>
  );
}
