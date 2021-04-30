import React from 'react';
import './RTmain.css';


const RTmain = () => {


        return(
            <main>
                <table>
                    <th>Enter Issue Details</th>
                    <tr>
                        <td className="TD_left">Category</td>
                        <td className="right_dropdown"> 
                            <label for="project"></label>
                            <select name="project" id="project"  className="right_dropdown">
                                <option value="project 1" selected>[All Project] General</option>
                                <option value="project 2">Project 1</option>
                                <option value="project 3">Project 2</option>
                                <option value="project 4">Project 3</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Priority</td>
                        <td className="right_dropdown" >
                            <lable for="priority"></lable>
                            <select name="priority" id="priority" className="right_dropdown">
                                <option value="priorityLevel"  selected>Priority Level</option>
                                <option value="veryUrgent">Very Urgent</option>
                                <option value="urgent">Urgent</option>
                                <option value="normal">Normal</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Assign To</td>
                        <td className="right_dropdown" >
                            <lable for="employee"></lable>
                            <select name="employee" id="employee" className="right_dropdown">
                                <option value="employeeName" selected>Select Employee Name</option>
                                <option value="employee1">Employee1</option>
                                <option value="employee2">Employee2</option>
                                <option value="employee3">Employee3</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Summary</td>
                        <td ><textarea className="textarea"/></td>
                    </tr>

                    <tr>
                        <td className="TD_left">Description</td>
                        <td  ><textarea className="textarea" /></td>
                    </tr>

                    <tr>
                        <td className="TD_left" >Upload files</td>
                        <td align="center">
                            <label for="input" className="label">Choose a File</label>
                            <input type="file" id="input" className="input_file" /></td>
                    </tr>

                </table>

                <button className="RTbutton_decor">Submit Issue</button>
            </main>
    
        );

}

export default RTmain;