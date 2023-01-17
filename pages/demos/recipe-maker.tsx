import React from 'react';

import {
  Box, Button, Divider, Grid, Paper, Stack, Text, TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import GPTCompletion from 'components/completion';
import { CreateCompletionRequest } from 'openai';
import { getCompletion } from 'libs/openai-client';

interface FormValues {
  input: string;
}

const conversationStart = `GPT responds to the user in a motherly tone of voice.

GPT=You there, what recipe are you looking for?`;

function generatePrompt(
  { input }: FormValues,
  existingConversation: string,
): CreateCompletionRequest {
  const prompt = `${existingConversation}
User=${input}
GPT=`;

  return {
    model: 'text-davinci-002',
    prompt,
    max_tokens: 120,
    temperature: 0.8,
  };
}

export default function Chatbot() {
  const form = useForm<FormValues>({
    initialValues: {
      input: "What are you craving?",
    },
    validate: {
      input: (value) => (value.length > 0 ? null : 'Invalid input'),
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [conversation, setConversation] = React.useState<string>(conversationStart);
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [openaiRequest, setOpenaiRequest] = React
    .useState<CreateCompletionRequest | undefined>(undefined);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const request = generatePrompt(values, conversation);
    setOpenaiRequest(request);
    await getCompletion(request).then((completion) => {
      const completionText = completion && completion.choices && completion.choices[0].text?.trim();
      setResult(completionText || 'No result, check the logs.');
      setConversation(`${request.prompt}${completionText}`);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="xs">
          <Paper shadow="xs" p="md">
            { conversation.split('\n').map((line) => {
              if (line.startsWith('User=')) {
                return (
                  <Text key={line}>
                    <strong>User:</strong>
                    {' '}
                    {line.substring(5)}
                  </Text>
                );
              }
              if (line.startsWith('GPT=')) {
                return (
                  <Text color="blue" key={line}>
                    <strong>GPT:</strong>
                    {' '}
                    {line.substring(4)}
                  </Text>
                );
              }
              return null;
            }) }
          </Paper>
          <Grid>
            <Grid.Col span={10}>
              <TextInput
                withAsterisk
                {...form.getInputProps('input')}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Button type="submit" loading={loading}>Send</Button>
            </Grid.Col>
          </Grid>

    {/*      { result && (
            <>
              <Divider my="xs" />
              <Title order={4}>GPT-3 Prompt</Title>
              { openaiRequest && <GPTCompletion request={openaiRequest} result={result} /> }
            </>
          )}*/}
        </Stack>
      </form>
    </Box>
  );
}
