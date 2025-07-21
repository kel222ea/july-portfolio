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
  TabTitleText
} from '@patternfly/react-core';

export const WizardComparison: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const frontendWizardCode = `// image-builder-frontend: CreateImageWizard.tsx
import { Wizard, WizardStep } from '@patternfly/react-core';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { wizardSlice } from '../store/wizardSlice';

const CreateImageWizard = () => {
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector(state => state.wizard);
  
  const steps: WizardStep[] = [
    {
      name: 'Image output',
      component: <ImageOutputStep />,
      enableNext: formData.imageOutput.isValid
    },
    {
      name: 'Target environment', 
      component: <TargetEnvironmentStep />,
      enableNext: formData.targetEnvironment.isValid
    },
    // ... 15+ steps total
  ];

  const onNext = ({ activeStep }) => {
    dispatch(wizardSlice.actions.setCurrentStep(activeStep.id + 1));
  };

  return (
    <Wizard
      navAriaLabel="Image creation steps"
      mainAriaLabel="Image creation wizard"
      steps={steps}
      onNext={onNext}
      height={600}
    />
  );
};`;

  const uxModalCode = `// image-builder-UX: BuildImageModal.tsx
import { Modal, Tabs, Tab, TabTitleText } from '@patternfly/react-core';

const BuildImageModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    distribution: '',
    architecture: '',
    // ... other form fields
  });

  const handleTabClick = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Modal
      title="Build image"
      isOpen={isOpen}
      onClose={onClose}
      width="60%"
      actions={[
        <Button key="build" variant="primary">
          Build image
        </Button>,
        <Button key="cancel" variant="link" onClick={onClose}>
          Cancel
        </Button>
      ]}
    >
      <Tabs activeKey={activeTab} onSelect={handleTabClick}>
        <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}>
          <ImageDetailsForm data={formData} onChange={setFormData} />
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Packages</TabTitleText>}>
          <PackagesForm data={formData} onChange={setFormData} />
        </Tab>
        // ... fewer tabs, simpler structure
      </Tabs>
    </Modal>
  );
};`;

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          Wizard vs Modal Workflows
        </Title>
        <Text>
          Comparing the multi-step wizard approach (production) with modal-based workflows (prototype).
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-frontend: Wizard Approach</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Full-page wizard with 15+ steps</strong>
                </Text>
                <Text component="small">
                  • Step-by-step navigation<br/>
                  • Complex validation system<br/>
                  • Redux state management<br/>
                  • Conditional step rendering<br/>
                  • Progress tracking
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-UX: Modal Approach</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Compact modal with tabbed sections</strong>
                </Text>
                <Text component="small">
                  • Tab-based navigation<br/>
                  • Basic form validation<br/>
                  • Local state management<br/>
                  • All-in-one view<br/>
                  • Quick completion
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Code Implementation Comparison</CardTitle>
            <CardBody>
              <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title={<TabTitleText>Frontend: Wizard</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{frontendWizardCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>UX: Modal</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{uxModalCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Key Differences</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={4}>
                  <Text component="h4">User Experience</Text>
                  <Text component="small">
                    <strong>Wizard:</strong> Guided, linear flow with clear progression<br/>
                    <strong>Modal:</strong> Quick, overview-based with flexible navigation
                  </Text>
                </GridItem>
                <GridItem span={4}>
                  <Text component="h4">State Management</Text>
                  <Text component="small">
                    <strong>Wizard:</strong> Redux with complex state tree<br/>
                    <strong>Modal:</strong> Simple useState hooks
                  </Text>
                </GridItem>
                <GridItem span={4}>
                  <Text component="h4">Validation</Text>
                  <Text component="small">
                    <strong>Wizard:</strong> Per-step validation with enableNext logic<br/>
                    <strong>Modal:</strong> Submit-time validation
                  </Text>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};