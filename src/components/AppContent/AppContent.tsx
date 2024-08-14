import { useWVGlobalState, python_api } from '../../utils.tsx';
import { Button } from "@blueprintjs/core";
import PlotWrapper from '../Plot/Plot.jsx';

export default function AppContent() {
  const [label] = useWVGlobalState("", "setLabel");

  return (
    <div>
      <Button
        intent="primary"
        text="Load file"
        icon="document-open"
        onClick={() => python_api()?.load_file()}
      />
      <label>{label}</label>
      <PlotWrapper/>
    </div>
  );
}
