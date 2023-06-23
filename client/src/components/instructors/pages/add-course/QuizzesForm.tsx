import React from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { Tooltip } from "@material-tailwind/react";
import { TiTrash } from "react-icons/ti";
import { QuizValidationSchema } from "../../../../validations/instructors/AddCourse";

type QuizzesFormProps = {
  onSubmit: (formData: any) => void;
};
const QuizzesForm: React.FC<QuizzesFormProps> = ({ onSubmit }) => {
  const initialValues = {
    questions: [
      {
        question: "",
        options: [{ option: "", isCorrect: false }],
      },
    ],
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <div className='max-w-md pt-10 mx-auto'>
      <Formik
        initialValues={initialValues}
        validationSchema={QuizValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FieldArray name='questions'>
              {({ push, remove: removeQuestion }) => (
                <div>
                  {values.questions.map((_, index) => (
                    <div key={index} className='mb-4'>
                      <div className='mb-2'>
                        <label
                          htmlFor={`questions.${index}.question`}
                          className='block font-bold mb-1 leading-6 text-gray-900'
                        >
                          Question {index + 1}
                        </label>
                        <Field
                          type='text'
                          id={`questions.${index}.question`}
                          name={`questions.${index}.question`}
                          className='border border-gray-300 px-3 py-2 rounded-lg w-full  focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                        />
                        <ErrorMessage
                          name={`questions.${index}.question`}
                          component='div'
                          className='text-red-500 text-xs'
                        />
                      </div>

                      <FieldArray name={`questions.${index}.options`}>
                        {({ push: pushOption, remove: removeOption }) => (
                          <div>
                            {values.questions[index].options.map(
                              (_, optionIndex) => (
                                <div key={optionIndex} className='mb-2'>
                                  <div className='flex items-center'>
                                    <Field
                                      type='text'
                                      id={`questions.${index}.options.${optionIndex}.option`}
                                      name={`questions.${index}.options.${optionIndex}.option`}
                                      className='border border-gray-300 px-3 py-2 rounded-lg w-full  focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                                    />
                                    <Field
                                      type='checkbox'
                                      id={`questions.${index}.options.${optionIndex}.isCorrect`}
                                      name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                      className='ml-2'
                                    />
                                    <label
                                      htmlFor={`questions.${index}.options.${optionIndex}.isCorrect`}
                                      className='ml-1'
                                    >
                                      Correct
                                    </label>

                                    <Tooltip
                                      content='Delete option'
                                      animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                      }}
                                    >
                                      <button
                                        type='button'
                                        onClick={() =>
                                          removeOption(optionIndex)
                                        }
                                        className='text-red-500 ml-2'
                                      >
                                        <TiTrash size={20} />
                                      </button>
                                    </Tooltip>
                                  </div>
                                  <ErrorMessage
                                    name={`questions.${index}.options.${optionIndex}.option`}
                                    component='div'
                                    className='text-red-500 text-xs'
                                  />
                                </div>
                              )
                            )}
                            <button
                              type='button'
                              onClick={() =>
                                pushOption({ option: "", isCorrect: false })
                              }
                              className='bg-blue-500 text-white px-4 text-xs py-2 rounded-lg'
                            >
                              Add Option
                            </button>
                          </div>
                        )}
                      </FieldArray>

                      <button
                        type='button'
                        onClick={() => removeQuestion(index)}
                        className='text-red-500 mt-2 text-xs'
                      >
                        Remove Question
                      </button>

                      <hr className='my-4' />
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      push({
                        question: "",
                        options: [{ option: "", isCorrect: false }],
                      })
                    }
                    className='bg-blue-500 text-white px-3 py-2 rounded-md text-xs'
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>
            <button
            type="submit"
              className="bg-blue-500 mt-5 text-white px-3 py-2 rounded-md text-xs">
              ADD QUIZ
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default QuizzesForm;
