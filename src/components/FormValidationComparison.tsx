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
  ListItem,
  TextInput,
  FormGroup,
  HelperText,
  HelperTextItem,
  Alert
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';

export const FormValidationComparison: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [demoInput, setDemoInput] = React.useState('');
  const [demoError, setDemoError] = React.useState('');

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const handleDemoInputChange = (value: string) => {
    setDemoInput(value);
    if (value.length < 3) {
      setDemoError('Must be at least 3 characters');
    } else {
      setDemoError('');
    }
  };

  const validatedInputCode = `// image-builder-frontend: ValidatedInput.tsx
import { useValidation } from '../hooks/useValidation';

interface ValidatedInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  validation: ValidationRule[];
  isRequired?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  name,
  label,
  value,
  onChange,
  validation,
  isRequired = false
}) => {
  const {
    isValid,
    errorMessage,
    helperText,
    validated,
    isDisabled,
    isPristine
  } = useValidation(name, value, validation);

  const handleChange = (inputValue: string) => {
    onChange(inputValue);
    // Validation automatically triggered via useValidation hook
  };

  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      fieldId={name}
      validated={validated}
    >
      <TextInput
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        validated={validated}
        isDisabled={isDisabled}
        aria-describedby={\`\${name}-helper\`}
      />
      <HelperText>
        <HelperTextItem
          id={\`\${name}-helper\`}
          variant={validated}
          hasIcon={validated === 'error'}
          icon={<ExclamationCircleIcon />}
        >
          {errorMessage || helperText}
        </HelperTextItem>
      </HelperText>
    </FormGroup>
  );
};

// Usage with complex validation
const ImageNameInput = () => {
  const dispatch = useAppDispatch();
  const { imageName } = useAppSelector(state => state.wizard.formData);
  
  const validation = [
    { rule: 'required', message: 'Image name is required' },
    { rule: 'minLength', value: 3, message: 'Must be at least 3 characters' },
    { rule: 'maxLength', value: 100, message: 'Must be less than 100 characters' },
    { rule: 'pattern', value: /^[a-zA-Z0-9-_]+$/, message: 'Only letters, numbers, hyphens and underscores allowed' },
    { rule: 'custom', fn: checkImageNameAvailability, message: 'Image name already exists' }
  ];
  
  return (
    <ValidatedInput
      name="imageName"
      label="Image name"
      value={imageName.value}
      onChange={value => dispatch(setImageName(value))}
      validation={validation}
      isRequired
    />
  );
};`;

  const basicValidationCode = `// image-builder-UX: BuildImageModal.tsx
const BuildImageModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    distribution: '',
    architecture: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Basic validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 3) return 'Name must be at least 3 characters';
        return '';
      case 'distribution':
        if (!value) return 'Distribution is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.values(newErrors).some(error => error)) {
      return; // Don't submit if there are errors
    }

    // Submit form
    onSubmit(formData);
  };

  return (
    <Modal>
      <FormGroup
        label="Name"
        isRequired
        fieldId="name"
        validated={touched.name && errors.name ? 'error' : 'default'}
      >
        <TextInput
          id="name"
          value={formData.name}
          onChange={value => handleInputChange('name', value)}
          validated={touched.name && errors.name ? 'error' : 'default'}
        />
        {touched.name && errors.name && (
          <HelperText>
            <HelperTextItem variant="error">{errors.name}</HelperTextItem>
          </HelperText>
        )}
      </FormGroup>
      
      <Button onClick={handleSubmit}>Build image</Button>
    </Modal>
  );
};`;

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          Form Validation Systems
        </Title>
        <Text>
          Comparing comprehensive validation architecture with basic form validation patterns.
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-frontend: ValidatedInput System</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Enterprise Validation Architecture</strong>
                </Text>
                <List>
                  <ListItem>Reusable ValidatedInput component</ListItem>
                  <ListItem>Custom useValidation hook</ListItem>
                  <ListItem>Complex validation rules engine</ListItem>
                  <ListItem>Real-time validation feedback</ListItem>
                  <ListItem>Pristine/dirty state tracking</ListItem>
                  <ListItem>Async validation support</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>image-builder-UX: Basic Validation</CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  <strong>Simple Form Validation</strong>
                </Text>
                <List>
                  <ListItem>Component-level validation logic</ListItem>
                  <ListItem>Basic error state management</ListItem>
                  <ListItem>Submit-time validation</ListItem>
                  <ListItem>Touched state tracking</ListItem>
                  <ListItem>Simple validation rules</ListItem>
                  <ListItem>Immediate feedback on errors</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card>
            <CardTitle>Live Demo: Enterprise Validation</CardTitle>
            <CardBody>
              <FormGroup
                label="Image Name"
                isRequired
                fieldId="enterprise-demo"
                validated={demoError ? 'error' : demoInput.length > 0 ? 'success' : 'default'}
              >
                <TextInput
                  id="enterprise-demo"
                  value={demoInput}
                  onChange={(_event, value) => handleDemoInputChange(value)}
                  validated={demoError ? 'error' : demoInput.length > 0 ? 'success' : 'default'}
                />
                <HelperText>
                  <HelperTextItem
                    variant={demoError ? 'error' : demoInput.length > 0 ? 'success' : 'default'}
                    hasIcon={!!demoError}
                    icon={<ExclamationCircleIcon />}
                  >
                    {demoError || (demoInput.length > 0 ? 'Valid image name' : 'Enter an image name (min 3 characters)')}
                  </HelperTextItem>
                </HelperText>
              </FormGroup>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card>
            <CardTitle>Validation Features Comparison</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={12}>
                  <Text component="h4">Real-time Validation</Text>
                  <Text component="small">
                    <strong>Frontend:</strong> ✅ Immediate validation on input change<br/>
                    <strong>UX:</strong> ⚠️ Validation on submit + some real-time
                  </Text>
                </GridItem>
                <GridItem span={12}>
                  <Text component="h4">Custom Rules</Text>
                  <Text component="small">
                    <strong>Frontend:</strong> ✅ Extensible rule engine with async support<br/>
                    <strong>UX:</strong> ✅ Simple custom validation functions
                  </Text>
                </GridItem>
                <GridItem span={12}>
                  <Text component="h4">Error Display</Text>
                  <Text component="small">
                    <strong>Frontend:</strong> ✅ Consistent helper text with icons<br/>
                    <strong>UX:</strong> ✅ Basic error messages
                  </Text>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Implementation Code Comparison</CardTitle>
            <CardBody>
              <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title={<TabTitleText>Enterprise: ValidatedInput</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{validatedInputCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>Basic: Simple Validation</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{basicValidationCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};