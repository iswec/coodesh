import React, { useState, useEffect } from 'react';

function Inbox({ email, emailId }) {
  const [inboxData, setInboxData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/email-token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `query { session(id: "${emailId}") {
                id
                expiresAt
                mails {
                  id
                  rawSize
                  raw
                  fromAddr
                  toAddr
                  receivedAt
                  downloadUrl
                  toAddrOrig
                  decodeStatus
                  text
                  headerFrom
                  headerSubject
                  html
                }
                addresses {
                  id
                  address
                  restoreKey
                }
              }
            }`,
              variables: {
                id: emailId,
              },
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar a caixa de entrada');
        }

        const json = await response.json();
        if (json.data && json.data.session && json.data.session.mails) {
          setInboxData(json.data.session.mails);
        } else {
          setInboxData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchInbox();
  }, [emailId, email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {inboxData.map((message) => (
        <div className="ml-[10rem]" key={message.id}>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-10 lg:flex-auto w-[20rem]">
                  <p className="text-base leading-7 text-gray-600">Inbox</p>
                  <div className="h-px flex-auto bg-gray-100"></div>
                  <p className="font-bold tracking-tight text-gray-900">
                    {message.headerSubject}
                  </p>
                </div>
                <div className="mt-2 w-[50rem] p-4">
                  <div
                    key={message.id}
                    className="rounded-2xl bg-gray-50 p-10 text-start ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-5"
                  >
                    <p className="font-bold tracking-tight text-gray-900">
                      {message.headerSubject}
                    </p>
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inbox;
