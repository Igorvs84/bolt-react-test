import { useState } from 'react'
      import { useEditor, EditorContent } from '@tiptap/react'
      import { Doc, Paragraph, Text } from '@tiptap/pm/model'
      import { basicSetup } from '@tiptap/pm/util'
      import { Underline,Italic,Bold } from '@tiptap/extension-style-text'
      
      const FormStep = ({ step, data, onChange }: any) => {
        switch (step) {
          case 1:
            return (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Имя"
                  value={data.name}
                  onChange={(e) => onChange({ name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                />
              </div>
            )
          case 2:
            return (
              <div className="space-y-4">
                <h3>Кто вы по профессии?</h3>
                <div className="flex flex-col space-y-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="profession"
                      value="programmer"
                      checked={data.profession === 'programmer'}
                      onChange={(e) => onChange({ profession: e.target.value })}
                    />
                    Программист
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="profession"
                      value="marketer"
                      checked={data.profession === 'marketer'}
                      onChange={(e) => onChange({ profession: e.target.value })}
                    />
                    Маркетолог
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="profession"
                      value="non-it"
                      checked={data.profession === 'non-it'}
                      onChange={(e) => onChange({ profession: e.target.value })}
                    />
                    Не ИТ-шник
                  </label>
                </div>
              </div>
            )
          case 3:
            return (
              <EditorContent editor={editor} />
            )
        }
      }

      const PollForm = () => {
        const [currentStep, setCurrentStep] = useState(1)
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          profession: '',
          description: Doc.create(basicSetup().createEmptyDocument().content),
        })
        const [showThanks, setShowThanks] = useState(false)

        const { editor, attributes } = useEditor({
          extensions: [Underline, Italic, Bold],
          content: formData.description,
          onUpdate: (content) => {
            setFormData({ ...formData, description: content })
          },
        })

        const handleNext = () => {
          if (currentStep < 3) {
            setCurrentStep(currentStep + 1)
          }
        }

        const handleBack = () => {
          if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
          }
        }

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          
          if (!formData.name || !formData.email) return

          // Show confirmation modal
          setShowThanks(true)
        }

        return (
          <div className="min-h-screen bg-gray-50 py-12 px-4">
            <form onSubmit={handleSubmit}>
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2>Шаг {currentStep} из 3</h2>
                
                <FormStep
                  step={currentStep}
                  data={formData}
                  onChange={(data) => setFormData(data)}
                />

                <div className="mt-8 flex justify-between items-center">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      Назад
                    </button>
                  )}
                  
                  {currentStep === 3 ? (
                    <button
                      type="submit"
                      className="bg-blue-600 px-8 py-2 rounded-md hover:bg-blue-700"
                    >
                      Отправить
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-green-600 px-8 py-2 rounded-md hover:bg-green-700"
                    >
                      Далее
                    </button>
                  )}
                </div>
              </div>
            </form>

            {showThanks && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3>Спасибо за ваше участие!</h3>
                  <p>Мы отправим ответ на вашу почту: {formData.email}</p>
                  <button
                    type="button"
                    onClick={() => setShowThanks(false)}
                    className="mt-4 bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      }

      export default PollForm
