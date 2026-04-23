import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';

import { fullSchema } from '../schemas/register.schema';
import RegisterStep1 from '../components/registration/RegisterStep1';
import RegisterStep2 from '../components/registration/RegisterStep2';
import RegisterStep3 from '../components/registration/RegisterStep3';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      categories: [''],
      notifications: {
        email: false,
        push: false,
      },
      newsletter: false,
      rodo: false,
    },
    mode: 'onTouched',
  });

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await form.trigger([
        'firstName',
        'lastName',
        'email',
        'password',
        'confirmPassword',
      ]);
    }

    if (step === 2) {
      valid = await form.trigger([
        'categories',
        'notifications.email',
        'notifications.push',
      ]);
    }

    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: any) => {
    try {
      // fake API
      if (data.email === 'taken@test.com') {
        form.setError('email', { message: 'Email zajęty' });
        setStep(1);
        return;
      }

      console.log('REGISTER SUCCESS', data);

      // later:
      // login({ email: data.email });

    } catch {
      form.setError('root.serverError', {
        message: 'Błąd serwera…',
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {step === 1 && <RegisterStep1 form={form} />}
      {step === 2 && <RegisterStep2 form={form} />}
      {step === 3 && (
        <RegisterStep3
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: step > 1 ? "space-between" : "flex-end" }}>
        {step > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            Wstecz
          </Button>
        )}

        {step < 3 && (
          <Button variant="contained" onClick={nextStep}>
            Dalej
          </Button>
        )}
      </Box>
    </Box>
  );
}