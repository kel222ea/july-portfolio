import * as React from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  Text,
  TextContent,
  CodeBlock,
  CodeBlockCode,
  Tabs,
  Tab,
  TabTitleText,
  List,
  ListItem
} from '@patternfly/react-core';

export const StateManagementComparison: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const reduxCode = `// image-builder-frontend: wizardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WizardState {
  currentStepId: string;
  formData: {
    imageOutput: {
      imageType: string;
      uploadTarget: string;
      isValid: boolean;
    };
    targetEnvironment: {
      aws: {
        accountId: string;
        shareMethod: string;
        sources: string[];
      };
      azure: {
        tenantId: string;
        subscriptionId: string;
        resourceGroup: string;
      };
      isValid: boolean;
    };
    // ... many more nested objects
  };
  isLoading: boolean;
  error: string | null;
}

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentStepId: (state, action: PayloadAction<string>) => {
      state.currentStepId = action.payload;
    },
    setImageType: (state, action: PayloadAction<string>) => {
      state.formData.imageOutput.imageType = action.payload;
      state.formData.imageOutput.isValid = validateImageOutput(state.formData.imageOutput);
    },
    setAwsAccountId: (state, action: PayloadAction<string>) => {
      state.formData.targetEnvironment.aws.accountId = action.payload;
      state.formData.targetEnvironment.isValid = validateTargetEnvironment(state.formData.targetEnvironment);
    },
    // ... 50+ action creators
  },
});

// Usage in component
const ImageOutputStep = () => {
  const dispatch = useAppDispatch();
  const { imageOutput } = useAppSelector(state => state.wizard.formData);
  
  const handleImageTypeChange = (value: string) => {
    dispatch(wizardSlice.actions.setImageType(value));
  };
  
  return (
    <Select
      value={imageOutput.imageType}
      onSelect={handleImageTypeChange}
      // ...
    />
  );
};`;

  const reactStateCode = `// image-builder-UX: BuildImageModal.tsx
import { useState } from 'react';

const BuildImageModal = ({ isOpen, onClose }) => {
  // Simple state management with useState
  const [formData, setFormData] = useState({
    name: '',
    distribution: 'rhel-8',
    architecture: 'x86_64',
    imageType: 'ami',
    packages: [],
    customizations: {
      hostname: '',
      description: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Direct state updates
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await buildImage(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <TextInput
        value={formData.name}
        onChange={value => handleInputChange('name', value)}
      />
      <TextInput
        value={formData.customizations.hostname}
        onChange={value => handleNestedInputChange('customizations', 'hostname', value)}
      />
    </Modal>
  );
};`;

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          State Management Patterns
        </Title>
        <Text>
          Comparing Redux + RTK Query enterprise state management with simple React useState hooks.
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-frontend: Redux + RTK</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Enterprise State Management</strong>
                </Text>
                <List>
                  <ListItem>Centralized store with slices</ListItem>
                  <ListItem>Immutable state updates</ListItem>
                  <ListItem>Type-safe selectors and actions</ListItem>
                  <ListItem>Middleware for async operations</ListItem>
                  <ListItem>Time-travel debugging</ListItem>
                  <ListItem>Predictable state mutations</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-UX: React useState</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Simple Local State</strong>
                </Text>
                <List>
                  <ListItem>Component-level state</ListItem>
                  <ListItem>Direct state mutations</ListItem>
                  <ListItem>Straightforward updates</ListItem>
                  <ListItem>Built-in React patterns</ListItem>
                  <ListItem>Minimal boilerplate</ListItem>
                  <ListItem>Easy to understand</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Implementation Comparison</CardTitle>
            <CardBody>
              <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title={<TabTitleText>Redux + RTK Query</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{reduxCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>React useState</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{reactStateCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Trade-offs Analysis</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Complexity</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Higher initial setup, many concepts to learn<br/>
                        <strong>useState:</strong> Simple, intuitive, immediate productivity
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Scalability</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Excellent for large applications with complex state<br/>
                        <strong>useState:</strong> Good for simple applications, can become unwieldy
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Debugging</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Excellent DevTools, predictable state changes<br/>
                        <strong>useState:</strong> Basic React DevTools, harder to trace state flow
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Performance</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Optimized with selectors, prevents unnecessary re-renders<br/>
                        <strong>useState:</strong> Can cause re-renders, needs careful optimization
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Testing</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Easy to test pure reducers and actions<br/>
                        <strong>useState:</strong> Requires component testing, harder to isolate
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Team Collaboration</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Redux:</strong> Consistent patterns, clear data flow<br/>
                        <strong>useState:</strong> More flexible, potentially inconsistent approaches
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};