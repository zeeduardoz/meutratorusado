import { useContext, useState } from 'react'

import { StockContext } from '@contexts/StockContext'
import { FaTrashAlt } from 'react-icons/fa'

export function ModalDelete(props: any) {
  const { useLoading, deleteEquipment } = useContext(StockContext)
  const [modal, setModal] = useState<boolean>(false)

  async function handleDelete() {
    try {
      deleteEquipment(props.chassi)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="hover:opacity-75 focus:outline-none px-1 text-color-danger delay-100 transition"
      >
        <FaTrashAlt />
      </button>
      {modal ? (
        <div
          className="min-w-scree animated fadeIn faster items-center bg-center bg-no-repeat bg-cover flex h-screen inset-0 left-0 top-0 justify-center outline-none focus:outline-none fixed z-50"
          id="modal-id"
        >
          <div className="bg-black inset-0 opacity-90 absolute z-0"></div>
          <div className="bg-primary rounded-xl shadow-lg mx-auto my-auto max-w-lg p-5 relative w-full">
            <div>
              <div className="flex-auto justify-center p-5 text-center">
                <h2 className="text-2xl font-black py-4 text-color-light">
                  Tem certeza?
                </h2>
                <p className="px-8 text-color-medium">
                  Tem certeza que deseja deletar este equipamento? Clique em
                  "DELETAR" para prosseguir.
                </p>
              </div>

              <div className="mt-2 p-3 space-x-4 text-center md:block">
                <button
                  onClick={() => setModal(false)}
                  className="items-center bg-color-danger rounded-full hover:shadow-lg shadow-sm inline-flex justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete()}
                  disabled={useLoading}
                  className="inline-fle items-center bg-color-success rounded-full hover:shadow-lg shadow-sm justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
                >
                  {useLoading && (
                    <svg
                      className="animate-spin h-5 -ml-1 mr-3 text-white w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {useLoading && <span>Aguarde</span>}
                  {!useLoading && <span>Deletar</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
