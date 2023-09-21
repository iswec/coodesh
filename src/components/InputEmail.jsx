import React, { useState, useEffect } from 'react';
import Copy from '../states/Copy';
import Inbox from './Inbox';

function InputEmail() {
  const [sessionData, setSessionData] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempEmailExpired, setTempEmailExpired] = useState(false); //salvar no localStorage
  const [emailId, setEmailId] = useState(null); // Salvar o id do email

  //////////////// Consumir a api DropMail e gerar o email ////////////////
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/email-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `mutation {
                      introduceSession {
                        id,
                        expiresAt,
                        addresses {
                          address
                        }
                    }
                }`,
            }),
          },
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar E-mail');
        }
        const json = await response.json();
        setSessionData(json.data.introduceSession);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
    fetchData();
  }, []);

  const gerarEmailAleatorio = () => {
    if (sessionData && sessionData.addresses.length > 0) {
      const randomAddress =
        sessionData.addresses[
          Math.floor(Math.random() * sessionData.addresses.length)
        ].address;
      setTempEmail(randomAddress);
      localStorage.setItem('tempEmail', randomAddress);
      localStorage.setItem('tempEmailId', sessionData.id);

      let id = sessionData.id;
      setEmailId(id);
    }
  };

  const clearEmail = () => {
    // Limpar o conteúdo do campo de e-mail
    const emailInput = document.getElementById('email-address');
    if (emailInput) {
      emailInput.value = '';
    }

    // Limpar o localStorage
    localStorage.removeItem('tempEmail');
    localStorage.removeItem('tempEmailId');
  };
  //////////////// Consumir a api DropMail e gerar o email ////////////////

  //////////////// Salvar no input oq está no Local Storage ////////////////
  useEffect(() => {
    const savedEmail = localStorage.getItem('tempEmail');

    if (savedEmail && !tempEmailExpired) {
      setTempEmail(savedEmail);
    } else {
      gerarEmailAleatorio();
    }
  }, [tempEmailExpired]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('tempEmailId');

    if (savedEmail && !tempEmailExpired) {
      setEmailId(savedEmail);
    } else {
      gerarEmailAleatorio();
    }
  }, [tempEmailExpired]);
  //////////////// Salvar no input oq está no Local Storage ////////////////

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-col space-y-6 ring-1 ring-gray-200 sm:mt-20 rounded-3xl  h-[20.5rem] w-[30rem] p-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto "
                src="https://lh5.googleusercontent.com/K0Rdzfb9eJJC4lWTZERK8dmmQ_IiplBcwkvbUYpvLIjMA3TpVljszp2Lc5w84SOog8oZbTWxHRwaS_hqLVKSIZhr-XvbYn64pQaCRMyJlYSNKSKQUAjOelhDc_09pAO6Yt6a579-"
                alt="Your Company"
              />
            </div>
            <label
              htmlFor="email"
              className="text-start text-1 font-bold leading-9 tracking-tight text-gray-900"
            >
              Your temporary email address
            </label>
            <form className="space-y-6" action="#" method="POST">
              <div className="flex max-w-md gap-x-4">
                <input
                  id="email-address" // Adicionando o ID aqui
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={tempEmail}
                  className="min-w-0 flex-auto rounded-md border bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="E-mail"
                  readOnly
                />
                <Copy />
              </div>
              <div className="flex gap-x-4">
                <button
                  type="button"
                  className="flex justify-center rounded-md bg-[#1267FC] px-1 py-[5px] w-full text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={gerarEmailAleatorio}
                >
                  Gerar email
                </button>

                <button
                  onClick={() => window.location.reload()}
                  type="button"
                  className="flex justify-center rounded-md bg-[#1267FC] px-1 py-[5px] w-full text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Notificações
                </button>
                <button
                  type="button"
                  onClick={clearEmail}
                  className=" flex justify-center rounded-md bg-red-500 px-1 py-[5px] w-full text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Apagar Email
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="m-[2rem]">
          <h3 className="text-base leading-7 text-gray-600">
            {tempEmail && <Inbox email={tempEmail} emailId={emailId} />}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InputEmail;
