import {
  Box, Group, Navbar, Stack, Text, ThemeIcon, UnstyledButton,
} from '@mantine/core';
import {
  IconBrandHipchat, IconBrandPython, IconBulb, IconDatabase, IconEdit,
  IconMoodSmileBeam, IconMovie, IconPig, IconSearch, IconStar,
} from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// Add your pages here!
const productExamples = [
  {
    icon: <IconBrandHipchat size={16} />,
    label: 'Software Engineer',
    sublabel: 'Conversation',
    path: 'software-engineer',
  },
  {
    icon: <IconBrandHipchat size={16} />,
    label: 'Digital Marketer',
    sublabel: 'Conversation',
    path: 'digital-marketer',
  },
    {
    icon: <IconBrandHipchat size={16} />,
    label: 'Recipe Maker',
    sublabel: 'Conversation',
    path: 'recipe-maker',
  },
   {
    icon: <IconBrandHipchat size={16} />,
    label: 'Code Commenter',
    sublabel: 'Conversation',
    path: 'commenting-code',
  },
    {
    icon: <IconBrandHipchat size={16} />,
    label: 'SQL Code Generator',
    sublabel: 'Conversation',
    path: 'sql-generator',
  },

];

interface MainLinkProps {
  icon: React.ReactNode;
  path: string;
  color?: string;
  label: string;
  sublabel?: string;
}

function MainLink({
  icon, color, label, path, sublabel,
}: MainLinkProps) {
  const router = useRouter();
  const linkPath = `/demos/${path}`;
  const currentPath = router.pathname === linkPath;
  return (
    <Link href={linkPath} passHref>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: 6,
          borderRadius: theme.radius.sm,
          color: theme.black,
          backgroundColor: currentPath ? theme.colors.blue[1] : undefined,
          '&:hover': {
            backgroundColor: theme.colors.blue[2],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light" size="sm">
            {icon}
          </ThemeIcon>

          <Box>
            <Text size="xs">{label}</Text>
            { sublabel && <Text size={10} color="dimmed" transform="uppercase">{ sublabel }</Text>}
          </Box>
        </Group>
      </UnstyledButton>
    </Link>
  );
}
MainLink.defaultProps = {
  color: undefined,
  sublabel: undefined,
};

export default function AppNavbar() {
  return (
    <Navbar width={{ base: 250 }} height="100%" p={6}>
      <Stack>
        <Box>
          <Text size="sm" weight="bold">Use cases</Text>
          { productExamples.map((link) => <MainLink {...link} key={link.label} />) }
        </Box>
      </Stack>
    </Navbar>
  );
}
