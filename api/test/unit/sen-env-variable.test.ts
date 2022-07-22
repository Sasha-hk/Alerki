import { SetAs, SetEnvVariable } from '@Shared/decorators/set-env-variable.decorator';

describe('SetEnvVariable testing', () => {
  test('should set class variable', () => {
    process.env.XClass = 'ok';

    class X {
      @SetEnvVariable('XClass') y: string;
    }

    const x = new X();

    expect(x.y).toBe(process.env.XClass);
  });

  test('should throw error', () => {
    expect(() => {
      class Z {
        @SetEnvVariable('NotExistVariableZ') y: string;
      }

      const z = new Z();
    }).toThrow('NotExistVariableZ not exists, please set it in the .env file');
  });

  test('should throw error when set not exists variable as number', () => {
    expect(() => {
      process.env.ABCD = 'abcd';

      class Z {
        @SetEnvVariable('ABCD', SetAs.number) y: number;
      }

      const z = new Z();
    }).toThrow('ABCD is not a number, but we got string: abcd');
  });

  test('should throw error when set not exists variable in default switch', () => {
    expect(() => {
      process.env.ABCD = 'abcd';

      class Z {
        // @ts-ignore
        @SetEnvVariable('ABCD', 'xyz') y: number;
      }

      const z = new Z();
    }).toThrow('SetEnvVariable unhandled type');
  });
});
