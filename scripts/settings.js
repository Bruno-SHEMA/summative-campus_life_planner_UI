import { getData } from "./storage.js";
import { retrievePlans, getPlans, importPlans } from "./state.js";
import { validateDatas } from "./validators.js";

const exportButton = document.querySelector("#export-json");
const importButton = document.querySelector("#import-json");
const fileInput = document.querySelector("#import-file");
const status = document.querySelector("#settings-status");
function showStatus(message, isError = false){
    status.textContent = message;
    status.dataset.status = isError ? "error" : "success";
}
function initializeSettings(){
    try{
        retrievePlans(getData());
    } catch (error){
        console.error("Ooops, could not access saved schedules", error);
        showStatus(
            "Could Not access the saved data", true,
        );
        exportButton.disabled = true;
        importButton.disabled = true;
        return false;
    }
    return true;
}
function exportSchedules(){
    try {
        const plans = getPlans();
        const json = JSON.stringify(plans, null, 2);
        const blob = new Blob([json], {type: "application/json",});
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `campusplanner-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);
        showStatus(`exported ${plans.length} schedule(S) successfully`);
    } catch(error){
        console.error("Export Failes", error);
        showStatus("Export Failed, try again", true);
    }
}
