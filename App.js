import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NextStepsGuidanceComponent, NextStep } from './next-steps-guidance.component';
import { DmnService, DMN_CONFIG } from 'services';
import { IdentityService } from '@m1_legacy/services/identity/identity.service';
import { HttpClientModule } from '@angular/common/http';

describe('NextStepsGuidanceComponent', () => {
  let component: NextStepsGuidanceComponent;
  let fixture: ComponentFixture<NextStepsGuidanceComponent>;
  let mockDmnService: jest.Mocked<DmnService>;
  let mockIdentityService: jest.Mocked<IdentityService>;

  const mockUserId = 'test-user-123';

  beforeEach(async () => {
    // Create mock services
    mockDmnService = {
      getAllDmnEntries: jest.fn(),
    } as any;

    mockIdentityService = {
      getEID: jest.fn().mockReturnValue(mockUserId),
    } as any;

    await TestBed.configureTestingModule({
      imports: [NextStepsGuidanceComponent, HttpClientModule],
      providers: [
        { provide: DmnService, useValue: mockDmnService },
        { provide: IdentityService, useValue: mockIdentityService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NextStepsGuidanceComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default input values', () => {
      expect(component.steps).toEqual([]);
      expect(component.governedObject).toBe('Finding');
      expect(component.workflow).toBe('finding');
      expect(component.taskType).toBe('');
      expect(component.userType).toBe('MO');
      expect(component.isClosed).toBe(false);
    });

    it('should initialize with custom input values', () => {
      component.governedObject = 'CustomObject';
      component.workflow = 'customWorkflow';
      component.taskType = 'customTask';
      component.userType = 'Admin';

      expect(component.governedObject).toBe('CustomObject');
      expect(component.workflow).toBe('customWorkflow');
      expect(component.taskType).toBe('customTask');
      expect(component.userType).toBe('Admin');
    });
  });

  describe('ngOnInit', () => {
    it('should get userId from IdentityService', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step 1' },
              description: { value: 'Description 1' },
              hyperlink: { value: 'https://example.com' },
            },
          ]),
        },
      ];

      mockDmnService.getAllDmnEntries.mockReturnValue(of(mockResponse));

      fixture.detectChanges(); // Triggers ngOnInit

      expect(mockIdentityService.getEID).toHaveBeenCalled();
      expect(component.userId).toBe(mockUserId);
    });

    it('should call dmnService.getAllDmnEntries with correct parameters', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([]),
        },
      ];

      component.governedObject = 'TestObject';
      component.workflow = 'testWorkflow';
      component.taskType = 'testTask';
      component.userType = 'TestUser';

      mockDmnService.getAllDmnEntries.mockReturnValue(of(mockResponse));

      fixture.detectChanges();

      expect(mockDmnService.getAllDmnEntries).toHaveBeenCalledWith(
        DMN_CONFIG.DECISION_ID_GETNEXTSTEPSGUIDANCE,
        mockUserId,
        'TestObject',
        'testWorkflow',
        'testTask',
        'TestUser'
      );
    });

    it('should populate steps on successful response', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step 1' },
              description: { value: 'Description 1' },
              hyperlink: { value: 'https://example.com' },
            },
            {
              stepTitle: { value: 'Step 2' },
              description: { value: 'Description 2' },
              hyperlink: { value: '' },
            },
          ]),
        },
      ];

      mockDmnService.getAllDmnEntries.mockReturnValue(of(mockResponse));

      fixture.detectChanges();

      expect(component.steps.length).toBe(2);
      expect(component.steps[0]).toEqual({
        title: 'Step 1',
        body: 'Description 1',
        link: {
          text: 'https://example.com',
          url: 'https://example.com',
          target: '_self',
        },
      });
      expect(component.steps[1]).toEqual({
        title: 'Step 2',
        body: 'Description 2',
      });
    });

    it('should handle error from dmnService', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('DMN Service Error');

      mockDmnService.getAllDmnEntries.mockReturnValue(
        throwError(() => mockError)
      );

      fixture.detectChanges();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching next steps from DMN:',
        mockError
      );
      expect(component.steps).toEqual([]);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('parseNextStepsGuidance', () => {
    it('should parse valid response correctly', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Test Step' },
              description: { value: 'Test Description' },
              hyperlink: { value: 'https://test.com' },
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([
        {
          title: 'Test Step',
          body: 'Test Description',
          link: {
            text: 'https://test.com',
            url: 'https://test.com',
            target: '_self',
          },
        },
      ]);
    });

    it('should handle steps without hyperlink', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step without link' },
              description: { value: 'Description' },
              hyperlink: { value: '' },
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([
        {
          title: 'Step without link',
          body: 'Description',
        },
      ]);
      expect(result[0].link).toBeUndefined();
    });

    it('should handle steps with whitespace-only hyperlink', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step' },
              description: { value: 'Description' },
              hyperlink: { value: '   ' },
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result[0].link).toBeUndefined();
    });

    it('should handle missing hyperlink property', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step' },
              description: { value: 'Description' },
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result[0].link).toBeUndefined();
    });

    it('should return empty array when businessEntityAttributeValue is missing', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const mockResponse = [{}];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No businessEntityAttributeValue found in response'
      );

      consoleWarnSpy.mockRestore();
    });

    it('should return empty array when response is empty', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const mockResponse: any[] = [];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No businessEntityAttributeValue found in response'
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle invalid JSON in businessEntityAttributeValue', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockResponse = [
        {
          businessEntityAttributeValue: 'invalid json',
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error parsing next steps guidance:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle non-array JSON in businessEntityAttributeValue', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify({
            notAnArray: 'value',
          }),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([]);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Expected array from businessEntityAttributeValue'
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle missing stepTitle or description values', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: {},
              description: {},
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result).toEqual([
        {
          title: '',
          body: '',
        },
      ]);
    });

    it('should handle null response', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = component['parseNextStepsGuidance'](null);

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should parse multiple steps correctly', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Step 1' },
              description: { value: 'Desc 1' },
              hyperlink: { value: 'https://link1.com' },
            },
            {
              stepTitle: { value: 'Step 2' },
              description: { value: 'Desc 2' },
              hyperlink: { value: 'https://link2.com' },
            },
            {
              stepTitle: { value: 'Step 3' },
              description: { value: 'Desc 3' },
            },
          ]),
        },
      ];

      const result = component['parseNextStepsGuidance'](mockResponse);

      expect(result.length).toBe(3);
      expect(result[0].title).toBe('Step 1');
      expect(result[1].title).toBe('Step 2');
      expect(result[2].title).toBe('Step 3');
      expect(result[0].link).toBeDefined();
      expect(result[1].link).toBeDefined();
      expect(result[2].link).toBeUndefined();
    });
  });

  describe('closeCard', () => {
    it('should set isClosed to true', () => {
      expect(component.isClosed).toBe(false);

      component.closeCard();

      expect(component.isClosed).toBe(true);
    });

    it('should emit closed event', () => {
      const closedSpy = jest.spyOn(component.closed, 'emit');

      component.closeCard();

      expect(closedSpy).toHaveBeenCalledWith();
      expect(closedSpy).toHaveBeenCalledTimes(1);
    });

    it('should both set isClosed and emit event', () => {
      const closedSpy = jest.spyOn(component.closed, 'emit');

      component.closeCard();

      expect(component.isClosed).toBe(true);
      expect(closedSpy).toHaveBeenCalled();
    });
  });

  describe('Output Events', () => {
    it('should have closed EventEmitter', () => {
      expect(component.closed).toBeDefined();
      expect(component.closed.observers.length).toBe(0);
    });
  });

  describe('Integration Tests', () => {
    it('should complete full lifecycle from init to close', () => {
      const mockResponse = [
        {
          businessEntityAttributeValue: JSON.stringify([
            {
              stepTitle: { value: 'Integration Step' },
              description: { value: 'Integration Description' },
              hyperlink: { value: 'https://integration.com' },
            },
          ]),
        },
      ];

      mockDmnService.getAllDmnEntries.mockReturnValue(of(mockResponse));
      const closedSpy = jest.spyOn(component.closed, 'emit');

      fixture.detectChanges(); // ngOnInit

      expect(component.steps.length).toBe(1);
      expect(component.isClosed).toBe(false);

      component.closeCard();

      expect(component.isClosed).toBe(true);
      expect(closedSpy).toHaveBeenCalled();
    });
  });
});
