"use client"
import React from 'react';
import { useForm } from "react-hook-form"

export const sendPushNotification = async (
  expoPushToken,
  title,
  content
) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: content
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })
    .then((response) => response.json())
    .then((data) => console.log('sendPushNotification', data));
};

export const sendManyPushNotifications = async (
  expoPushTokens,
  title,
  content
) => {

  expoPushTokens.map(async (token) => {
    sendPushNotification(token, title, content);
  });

};

export default function Home() {
  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = async (data) => {
    await sendPushNotification('ExponentPushToken[NkMf_YGqX6M1KJj4hx37o6]', 'Nova notificação!', `${data.mensagemDaNotificao} ${data.nomeDoMotorista}`)
    console.log(data)
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Mensagem</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensagem da notificação</label>
        <input {...register("mensagemDaNotificao")} type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione o motorista</label>
        <select {...register("nomeDoMotorista")} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="guga">Motorista Guga</option>
          <option value="tartas">Motorista Tartas</option>
        </select>
        <button type="submit" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
      </form>
    </div>
  )
}
