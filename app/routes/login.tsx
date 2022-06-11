import { useNavigate } from '@remix-run/react';
import { Formik, Form, Field } from "formik";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { passwordLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl font-bold mb-4 w-64">Login</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => passwordLogin(values.email, values.password, () => navigate('/twoFactor'))}
      >
        {() => (
          <Form>
            <div>
              <Field
                name="email"
                placeholder="email"
                className="bg-gray-700 p-4 mb-2 w-full"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="password"
                className="bg-gray-700 p-4 mb-4 w-full"
              />
            </div>
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

export default LoginPage;
