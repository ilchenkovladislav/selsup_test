import React from "react";
import "./App.css";

export const App = () => {
  interface Param {
    id: number;
    name: string;
    type: "string" | "number" | "list";
  }

  interface ParamValue {
    paramId: number;
    value: string;
  }

  interface Model {
    paramValues: ParamValue[];
  }

  interface Props {
    params: Param[];
    model: Model;
  }

  interface State {
    paramValues: ParamValue[];
  }

  class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        paramValues: props.model.paramValues,
      };
    }

    public getModel = () => {
      return {
        paramValues: this.state.paramValues,
      };
    };

    render() {
      const { params } = this.props;
      const { paramValues } = this.state;

      function getInputType(paramType: string) {
        switch (paramType) {
          case "string":
            return "text";
        }
      }

      return (
        <div className="params">
          {params.map((param) => (
            <div key={param.id} className="param">
              <label htmlFor={`param-${param.id}`}>{param.name}</label>
              <input
                type={getInputType(param.type)}
                id={`param-${param.id}`}
                value={
                  paramValues.find(
                    (paramValue) => paramValue.paramId === param.id
                  )?.value || ""
                }
                onChange={(e) =>
                  this.handleParamChange(param.id, e.target.value)
                }
              />
            </div>
          ))}
          <button
            onClick={() => {
              console.log(this.getModel());
            }}
          >
            getModel()
          </button>
        </div>
      );
    }

    // hello
    private handleParamChange = (paramId: number, value: string) => {
      this.setState((state) => {
        const paramExists = state.paramValues.some(
          (paramValue) => paramValue.paramId === paramId
        );

        const updatedParamValues = paramExists
          ? this.updateParamValue(state.paramValues, paramId, value)
          : this.addParamValue(state.paramValues, paramId, value);

        const filteredParamValues = this.filterEmptyValues(updatedParamValues);

        return {
          paramValues: filteredParamValues,
        };
      });
    };

    private updateParamValue(
      paramValues: ParamValue[],
      paramId: number,
      value: string
    ): ParamValue[] {
      return paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      );
    }

    private addParamValue(
      paramValues: ParamValue[],
      paramId: number,
      value: string
    ): ParamValue[] {
      return [...paramValues, { paramId, value }];
    }

    private filterEmptyValues(paramValues: ParamValue[]): ParamValue[] {
      return paramValues.filter((paramValue) => !!paramValue.value);
    }
  }

  let params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: "string",
    },
    {
      id: 2,
      name: "Длина",
      type: "string",
    },
    {
      id: 3,
      name: "Цена",
      type: "string",
    },
    {
      id: 4,
      name: "Цвет",
      type: "string",
    },
    {
      id: 5,
      name: "Вес",
      type: "string",
    },
  ];

  let model: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  };

  return (
    <div className="App">
      <ParamEditor model={model} params={params} />
    </div>
  );
};
