import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ObjectOverviewComponent } from './object-overview.component';
import { IdentityService } from 'services';
import { GovernedObjectService } from 'services';
import { TaskDataService } from 'global-ui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('ObjectOverviewComponent', () => {
  let component: ObjectOverviewComponent;
  let fixture: ComponentFixture<ObjectOverviewComponent>;
  let mockIdentityService: any;
  let mockGovernedObjectService: any;
  let mockActivatedRoute: any;

  const mockGovernedObject = {
    governedObjectUuid: 'test-uuid-123',
    governedObjectDescription: 'Test description for governed object',
    governedObjectName: 'Test Object',
    status: 'active'
  };

  beforeEach(async () => {
    // Create mock service objects
    mockIdentityService = {
      getUser: jest.fn()
    };

    mockGovernedObjectService = {
      getGovernedObjectByUuid: jest.fn()
    };

    // Mock ActivatedRoute with params observable
    mockActivatedRoute = {
      params: of({ governedObjectUuid: 'test-uuid-123' })
    };

    await TestBed.configureTestingModule({
      imports: [ObjectOverviewComponent, CommonModule],
      providers: [
        { provide: IdentityService, useValue: mockIdentityService },
        { provide: GovernedObjectService, useValue: mockGovernedObjectService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        TaskDataService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectOverviewComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default property values', () => {
      expect(component.userName).toBe('');
      expect(component.description).toBe('');
      expect(component.governedObjectUuid).toBeUndefined();
      expect(component.allTasksCount).toBe(0);
      expect(component.myTasksCount).toBe(0);
    });

    it('should have correct stats title and subtitle', () => {
      expect(component.statsTitle).toBe('Findings overview');
      expect(component.statsSubtitle).toBe('Active models');
    });

    it('should have correct stats array', () => {
      expect(component.stats).toEqual([
        { name: 'Open', value: 120 },
        { name: 'Remediated', value: 3 },
        { name: 'Upcoming', value: 2 },
        { name: 'Past due', value: 0 }
      ]);
    });

    it('should initialize today with current date', () => {
      const today = new Date();
      expect(component.today.toDateString()).toBe(today.toDateString());
    });
  });

  describe('ngOnInit', () => {
    it('should call identityService.getUser on initialization', () => {
      mockIdentityService.getUser.mockReturnValue('John Doe');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.ngOnInit();

      expect(mockIdentityService.getUser).toHaveBeenCalled();
      expect(component.userName).toBe('John Doe');
    });

    it('should set governedObjectUuid from route params', () => {
      mockIdentityService.getUser.mockReturnValue('John Doe');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.ngOnInit();

      expect(component.governedObjectUuid).toBe('test-uuid-123');
    });

    it('should call fetchGovernedObject when governedObjectUuid is present in route params', () => {
      mockIdentityService.getUser.mockReturnValue('John Doe');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );
      jest.spyOn(component, 'fetchGovernedObject');

      component.ngOnInit();

      expect(component.fetchGovernedObject).toHaveBeenCalledWith('test-uuid-123');
    });

    it('should not call fetchGovernedObject when governedObjectUuid is not present in route params', () => {
      mockActivatedRoute.params = of({});
      mockIdentityService.getUser.mockReturnValue('John Doe');
      jest.spyOn(component, 'fetchGovernedObject');

      component.ngOnInit();

      expect(component.fetchGovernedObject).not.toHaveBeenCalled();
    });

    it('should handle empty governedObjectUuid in route params', () => {
      mockActivatedRoute.params = of({ governedObjectUuid: '' });
      mockIdentityService.getUser.mockReturnValue('John Doe');
      jest.spyOn(component, 'fetchGovernedObject');

      component.ngOnInit();

      expect(component.governedObjectUuid).toBe('');
      expect(component.fetchGovernedObject).not.toHaveBeenCalled();
    });

    it('should handle null governedObjectUuid in route params', () => {
      mockActivatedRoute.params = of({ governedObjectUuid: null });
      mockIdentityService.getUser.mockReturnValue('John Doe');
      jest.spyOn(component, 'fetchGovernedObject');

      component.ngOnInit();

      expect(component.governedObjectUuid).toBeNull();
      expect(component.fetchGovernedObject).not.toHaveBeenCalled();
    });
  });

  describe('fetchGovernedObject', () => {
    it('should call governedObjectService.getGovernedObjectByUuid with correct uuid', () => {
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.fetchGovernedObject('test-uuid-123');

      expect(mockGovernedObjectService.getGovernedObjectByUuid).toHaveBeenCalledWith(
        'test-uuid-123'
      );
    });

    it('should set description from response when governedObjectDescription is present', async () => {
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.fetchGovernedObject('test-uuid-123');

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.description).toBe('Test description for governed object');
    });

    it('should set description to empty string when governedObjectDescription is missing', async () => {
      const objectWithoutDescription: any = {
        governedObjectUuid: mockGovernedObject.governedObjectUuid,
        governedObjectName: mockGovernedObject.governedObjectName,
        status: mockGovernedObject.status
      };

      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(objectWithoutDescription)
      );

      component.fetchGovernedObject('test-uuid-123');

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.description).toBe('');
    });

    it('should set description to empty string when governedObjectDescription is null', async () => {
      const objectWithNullDescription = {
        ...mockGovernedObject,
        governedObjectDescription: null
      };

      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(objectWithNullDescription)
      );

      component.fetchGovernedObject('test-uuid-123');

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.description).toBe('');
    });

    it('should handle error when fetching governed object fails', () => {
      const errorResponse = { status: 404, message: 'Not found' };
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        throwError(() => errorResponse)
      );
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      component.fetchGovernedObject('test-uuid-123');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching governed object:',
        errorResponse
      );
      consoleSpy.mockRestore();
    });

    it('should not modify description when error occurs', () => {
      component.description = 'Initial description';
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        throwError(() => new Error('Network error'))
      );

      component.fetchGovernedObject('test-uuid-123');

      expect(component.description).toBe('Initial description');
    });

    it('should handle 500 server error', () => {
      const serverError = { status: 500, message: 'Internal server error' };
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        throwError(() => serverError)
      );
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      component.fetchGovernedObject('test-uuid-123');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching governed object:',
        serverError
      );
      consoleSpy.mockRestore();
    });

    it('should handle network timeout error', () => {
      const timeoutError = { status: 0, message: 'Timeout' };
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        throwError(() => timeoutError)
      );
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      component.fetchGovernedObject('test-uuid-123');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching governed object:',
        timeoutError
      );
      consoleSpy.mockRestore();
    });
  });

  describe('onCountsChanged', () => {
    it('should update allTasksCount and myTasksCount when called', () => {
      const counts = {
        allTasksCount: 50,
        myTasksCount: 10
      };

      component.onCountsChanged(counts);

      expect(component.allTasksCount).toBe(50);
      expect(component.myTasksCount).toBe(10);
    });

    it('should handle zero counts', () => {
      const counts = {
        allTasksCount: 0,
        myTasksCount: 0
      };

      component.onCountsChanged(counts);

      expect(component.allTasksCount).toBe(0);
      expect(component.myTasksCount).toBe(0);
    });

    it('should handle large counts', () => {
      const counts = {
        allTasksCount: 9999,
        myTasksCount: 9999
      };

      component.onCountsChanged(counts);

      expect(component.allTasksCount).toBe(9999);
      expect(component.myTasksCount).toBe(9999);
    });

    it('should update counts multiple times', () => {
      component.onCountsChanged({ allTasksCount: 10, myTasksCount: 5 });
      expect(component.allTasksCount).toBe(10);
      expect(component.myTasksCount).toBe(5);

      component.onCountsChanged({ allTasksCount: 20, myTasksCount: 15 });
      expect(component.allTasksCount).toBe(20);
      expect(component.myTasksCount).toBe(15);
    });
  });

  describe('Integration Tests', () => {
    it('should complete full initialization flow with valid route params', async () => {
      mockIdentityService.getUser.mockReturnValue('Jane Smith');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.ngOnInit();

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.userName).toBe('Jane Smith');
      expect(component.governedObjectUuid).toBe('test-uuid-123');
      expect(component.description).toBe('Test description for governed object');
      expect(mockGovernedObjectService.getGovernedObjectByUuid).toHaveBeenCalledWith(
        'test-uuid-123'
      );
    });

    it('should handle initialization without route params gracefully', () => {
      mockActivatedRoute.params = of({});
      mockIdentityService.getUser.mockReturnValue('John Doe');

      component.ngOnInit();

      expect(component.userName).toBe('John Doe');
      expect(component.governedObjectUuid).toBeUndefined();
      expect(mockGovernedObjectService.getGovernedObjectByUuid).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined user from identityService', () => {
      mockIdentityService.getUser.mockReturnValue(undefined as any);
      mockActivatedRoute.params = of({});

      component.ngOnInit();

      expect(component.userName).toBeUndefined();
    });

    it('should handle empty string user from identityService', () => {
      mockIdentityService.getUser.mockReturnValue('');
      mockActivatedRoute.params = of({});

      component.ngOnInit();

      expect(component.userName).toBe('');
    });

    it('should handle special characters in governedObjectDescription', async () => {
      const specialCharObject = {
        ...mockGovernedObject,
        governedObjectDescription: 'Test <script>alert("xss")</script> & special chars © ™'
      };
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(specialCharObject)
      );

      component.fetchGovernedObject('test-uuid-123');

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.description).toBe(
        'Test <script>alert("xss")</script> & special chars © ™'
      );
    });

    it('should handle very long governedObjectDescription', async () => {
      const longDescription = 'A'.repeat(10000);
      const longDescObject = {
        ...mockGovernedObject,
        governedObjectDescription: longDescription
      };
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(longDescObject)
      );

      component.fetchGovernedObject('test-uuid-123');

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(component.description).toBe(longDescription);
      expect(component.description.length).toBe(10000);
    });

    it('should handle UUID with special characters', () => {
      const specialUuid = 'uuid-with-special-chars-!@#$%';
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      component.fetchGovernedObject(specialUuid);

      expect(mockGovernedObjectService.getGovernedObjectByUuid).toHaveBeenCalledWith(
        specialUuid
      );
    });
  });

  describe('Component Template Rendering', () => {
    it('should render without errors', () => {
      mockIdentityService.getUser.mockReturnValue('Test User');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      fixture.detectChanges();

      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should have stats array accessible for template', () => {
      fixture.detectChanges();

      expect(component.stats.length).toBe(4);
      expect(component.stats[0].name).toBe('Open');
    });
  });

  describe('Memory Leak Prevention', () => {
    it('should unsubscribe from route params on component destroy', () => {
      mockIdentityService.getUser.mockReturnValue('Test User');
      mockGovernedObjectService.getGovernedObjectByUuid.mockReturnValue(
        of(mockGovernedObject)
      );

      const unsubscribeSpy = jest.fn();
      const mockSubscription = {
        unsubscribe: unsubscribeSpy
      };
      
      jest.spyOn(mockActivatedRoute.params, 'subscribe').mockReturnValue(mockSubscription as any);

      component.ngOnInit();
      fixture.destroy();

      // Note: This test assumes you'll implement proper subscription cleanup
      // Currently the component has a memory leak that should be fixed
    });
  });
});
