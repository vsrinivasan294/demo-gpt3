import React from 'react';

import { Prism } from '@mantine/prism';
import {
  Box, Button, Divider, Paper, Stack, TextInput, Textarea, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import GPTCompletion from 'components/completion';
import { CreateCompletionRequest } from 'openai';
import { getCompletion } from 'libs/openai-client';

interface FormValues {
  input: string;
}

const schema = `// Postgres SQL
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
);
CREATE TABLE "UserVisit" (
  "id" TEXT NOT NULL,
  "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
);`;



function generatePrompt({ input, input_code }: FormValues): CreateCompletionRequest {
  const prompt = `${input_code};
// ${input}
SELECT`;

  return {
    model: 'code-davinci-002',
    prompt,
    max_tokens: 60,
    temperature: 0,
    stop: ';',
  };
}

export default function SQLGenerator() {
  const form = useForm<FormValues>({
    initialValues: {
      input: 'Count the unique number of users with weekly visits to the website within the past 12 months.',
      input_code: "Enter your code here .......",
    },
    validate: {
      input: (value) => (value.length > 0 ? null : 'Invalid input'),
      input_code: (value) => (value.length > 0 ? null : 'Invalid input'),
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [openaiRequest, setOpenaiRequest] = React
    .useState<CreateCompletionRequest | undefined>(undefined);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const request = generatePrompt(values);
    setOpenaiRequest(request);
    await getCompletion(request).then((completion) => {
      setResult(completion && completion.choices
        ? completion.choices[0].text
        : 'No result, check the logs.');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="xs">
          <Title order={4}>DB Schema</Title>
          <Paper shadow="xs" p="md">
         {/*   <Prism language="sql">
              { schema }
            
            </Prism>*/}
              
               <Textarea
            minRows={8}
            withAsterisk
            label="Enter SQL Code here for testing/verification"
            {...form.getInputProps('input_code')}
          />

          </Paper>
          <TextInput
            withAsterisk
            label="Enter a description of a SQL query"
            {...form.getInputProps('input')}
          />
          <Button type="submit" loading={loading}>Translate!</Button>
          { (result && !loading)
          && (
            <>
              <Divider my="xs" />
              <Title order={4}>Result</Title>
              <Paper shadow="xs" p="md">
                <Prism language="sql">{`SELECT${result};`}</Prism>
              </Paper>

            </>
          )}
        </Stack>
      </form>
    </Box>
  );
}