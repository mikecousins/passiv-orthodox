import { useNavigate } from '@remix-run/react';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../hooks/useAuth';

const TwoFactorPage = () => {
  const { tokenLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl font-bold mb-4 w-64">Token</div>
      <Formik
        initialValues={{
          token: '',
        }}
        onSubmit={(values) =>
          tokenLogin(values.token, () => navigate('/dashboard'))
        }
      >
        {() => (
          <Form>
            <Field
              name="token"
              placeholder="token"
              className="bg-gray-700 p-4 mb-2 w-full"
            />
            <button
              type="submit"
              className="border-gray-700 bg-gray-800 hover:bg-gray-700 w-full p-2"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TwoFactorPage;
