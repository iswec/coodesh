import React from 'react';
import ClipboardJS from 'clipboard';
import { BiSolidCopy } from 'react-icons/bi';

export default function Copy() {
  const copyButtonRef = React.useRef(null);

  React.useEffect(() => {
    const clipboard = new ClipboardJS(copyButtonRef.current, {
      target: () => document.getElementById('email-address'),
    });
    return () => clipboard.destroy();
  }, []);

  return (
    <div>
      <button
        ref={copyButtonRef}
        type="button"
        className="flex items-center rounded-md bg-[#1267FC] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <BiSolidCopy className="w-5 h-5 mr-2" />
        Copy
      </button>
    </div>
  );
}
