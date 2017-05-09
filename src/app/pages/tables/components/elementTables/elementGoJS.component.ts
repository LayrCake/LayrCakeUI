import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '_services/data.service';

import * as go from "gojs";

@Component({
    selector: 'angular-gojs-test-app',
    styleUrls: ['./elementGoJS.scss'],
    template: 
    `<div>
          <input type="search" id="PackageIDInput" #packageIDInput (keyup)="onKey($event)" (keyup.enter)="onEnter(box.value)">
          <button onclick="load()">Load</button>
          <input type="search" id="mySearch" onkeypress="if (event.keyCode === 13) searchDiagram()">
          <button onclick="searchDiagram()">Search</button>
          <button id="SaveButton" onclick="save()">Save</button>
          <button onclick="insertIntoArray()">Insert New Property</button>
          <button onclick="removeFromArray()">Remove Property</button>
      </div>
      <p></p>
      <div id="myDiagramDiv" #myDiagramDiv style="width:100%; height:900px; background-color: #DAE4E4;"></div>
      <div id="myOverview"></div>
      <div><div id="myInspector" style="top: 90px; right: 60px; position: absolute;"></div></div>`
})
export class ElementGoJS implements AfterViewInit {
    title = 'angular-gojs-test works!';
    @ViewChild('myDiagramDiv') diagram;
    @ViewChild('myOverview') overviewer;
    @ViewChild('packageIDInput') packageIDInput: ElementRef;

    myDiagram ;
    // create a make type from go namespace and assign it to MAKE
    MAKE = go.GraphObject.make;

    nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes
    elementSuffix = "Bso";
    elementFKSuffix = "Ref";
    packageId = "4000001";
    serverUrl = "http://13.93.125.180:8731";

    constructor(private dataService: DataService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.dataService.getDDDPackage(params['packageID']));
            //.subscribe(selection => this.selection = selection);

        this.loadData();
    }

    ngAfterViewInit() {
        // get the div in the HTML file
        const diagramDiv = this.diagram.nativeElement;
        const MAKE = go.GraphObject.make;

        // instatiate MAKE with Diagram type and the diagramDiv
        const myDiagram =
            MAKE(go.Diagram, this.diagram.nativeElement,
                {
                    initialContentAlignment: go.Spot.Center,
                    initialDocumentSpot: go.Spot.TopCenter,
                    initialViewportSpot: go.Spot.TopCenter,
                    allowDelete: false,
                    allowCopy: false,
                    //http://gojs.net/latest/samples/orgChartEditor.html
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = {
                            key: this.getNextKey(), // assign the key based on the number of nodes
                            name: "ElementNameBso",
                            methods: [
                                { name: "ElementNameID", returnType: "int" },
                                { name: "Created", returnType: "DateTime" },
                                { name: "CreatedBy", returnType: "int" },
                                { name: "Updated", returnType: "DateTime?" },
                                { name: "UpdatedBy", returnType: "int?" },
                                { name: "Deleted", returnType: "DateTime?" },
                                { name: "DeletedBy", returnType: "int?" }
                            ]
                        };
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout: MAKE(go.ForceDirectedLayout), "undoManager.isEnabled": true
                });

        // the template we defined earlier
        myDiagram.nodeTemplate =
            MAKE(go.Node, "Auto",
                {
                    selectionAdorned: true,
                    resizable: false,
                    layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                    fromSpot: go.Spot.AllSides,
                    toSpot: go.Spot.AllSides,
                    isShadowed: true,
                    shadowColor: "#C5C1AA"
                },
                new go.Binding("location", "location").makeTwoWay(),
                MAKE(go.Shape, "Rectangle",
                    { fill: this.lightgrad, stroke: "#756875", strokeWidth: 3 }),
                MAKE(go.Panel, "Table",
                    { margin: 8, stretch: go.GraphObject.Fill },
                    MAKE(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None, separatorStroke: "black" }),
                    MAKE(go.TextBlock,
                        {
                            row: 0, alignment: go.Spot.Center,
                            margin: new go.Margin(0, 14, 0, 2), // leave room for Button
                            font: "bold 16px sans-serif"
                        },
                        new go.Binding("text", "name").makeTwoWay(),
                        { editable: true, isMultiline: false }),
                    //$(go.TextBlock,
                    //    {
                    //        row: 0,//visibility: hidden
                    //    },
                    //    new go.Binding("text", "created"),
                    MAKE("PanelExpanderButton", "LIST", // the name of the element whose visibility this button toggles
                        { row: 0, alignment: go.Spot.TopRight }),
                    MAKE(go.Panel, "Table",  // Hugh Custom code for adding list of Methods
                        new go.Binding("itemArray", "methods"),
                        {
                            name: "LIST",
                            row: 1,
                            padding: 3,
                            defaultAlignment: go.Spot.Left,
                            defaultColumnSeparatorStroke: "black",
                            itemTemplate:  // the row created for each item in the itemArray
                            MAKE(go.Panel, "TableRow",
                                MAKE(go.TextBlock,
                                    {
                                        column: 0, margin: new go.Margin(3, 2, 0, 5), stroke: "#333333", font: "bold 14px sans-serif",
                                        editable: true, isMultiline: false, minSize: new go.Size(10, 16),
                                    }, new go.Binding("text", "name").makeTwoWay()),
                                MAKE(go.TextBlock, new go.Binding("text", "returnType").makeTwoWay(),
                                    {
                                        column: 1, margin: new go.Margin(3, 2, 0, 5), stroke: "#333333", font: "bold 14px sans-serif",
                                        editable: true, isMultiline: false, minSize: new go.Size(10, 16),
                                        //---------------------textEditor: customEditor //margin: new go.Margin(0, 0, 0, 3),
                                    })
                            )
                        },
                        MAKE(go.Panel, "TableRow",
                            { isPanelMain: true },  // needed to keep this element when itemArray gets an Array
                            MAKE(go.TextBlock, "Column Name",
                                { column: 0, margin: new go.Margin(2, 2, 3, 5), font: "bold 15px sans-serif" }),
                            MAKE(go.TextBlock, "Data Type",
                                { column: 1, margin: new go.Margin(2, 2, 3, 5), font: "bold 15px sans-serif" })
                        ),
                        MAKE(go.RowColumnDefinition,
                            { row: 1, separatorStroke: "black" })
                    )
                ) // end Table Panel
            ); // end Node

        // define a Link template that routes orthogonally, with no arrowhead
        myDiagram.linkTemplate =
            MAKE(go.Link,  // the whole link panel
                {
                    selectionAdorned: true,
                    layerName: "Foreground",
                    reshapable: false,
                    routing: go.Link.AvoidsNodes,
                    corner: 5,
                    curve: go.Link.JumpOver
                },
                MAKE(go.Shape,  // the link shape
                    { stroke: "#303B45", strokeWidth: 2.5 }),
                MAKE(go.TextBlock,  // the "from" label
                    {
                        textAlign: "center",
                        font: "bold 14px sans-serif",
                        stroke: "#1967B3",
                        segmentIndex: 0,
                        segmentOffset: new go.Point(NaN, NaN),
                        segmentOrientation: go.Link.OrientUpright
                    },
                    new go.Binding("text", "text")),
                MAKE(go.TextBlock,   // the "to" label
                    {
                        textAlign: "center",
                        font: "bold 14px sans-serif",
                        stroke: "#1967B3",
                        segmentIndex: -1,
                        segmentOffset: new go.Point(NaN, NaN),
                        segmentOrientation: go.Link.OrientUpright
                    },
                    new go.Binding("text", "toText"))
            );

        myDiagram.nodeTemplate.contextMenu =
            MAKE(go.Adornment, "Vertical",
                MAKE("ContextMenuButton",
                    MAKE(go.TextBlock, "Remove Element"),
                    {
                        click: function (e, obj) {
                            // remove the whole subtree, including the node itself
                            var node = obj.part.adornedPart;
                            if (node !== null) {
                                myDiagram.startTransaction("remove element");
                                myDiagram.removeParts(node.findTreeParts());
                                myDiagram.commitTransaction("remove element");
                            }
                        }
                    }
                )
            );

        $.get(this.serverUrl + '/tables/DbDiagramDataCombined_GoJs', { packageRef: this.packageId },
            function (result) {
                if (result.nodes != "null") {
                    //myDiagram.model = MAKE(new go.GraphLinksModel().modelData);

                    myDiagram.model = new go.GraphLinksModel(JSON.parse(result["nodes"]), JSON.parse(result["links"]) != null ? JSON.parse(result["links"]) : new Array());
                }
                else
                    myDiagram.model = new go.GraphLinksModel();
            }).fail(function () {
                alert("Model was not upated, if this happens repeatedly, please contact: info@layrcake.com");
            });
        this.myDiagram = myDiagram;
    }

    public loadData() {
        $.get(this.serverUrl + '/tables/DbDiagramDataCombined_GoJs', { packageRef: this.packageId },
            function (result) {
                if (result.nodes != "null") {
                    this.myDiagram.model = new go.GraphLinksModel(JSON.parse(result["nodes"]), JSON.parse(result["links"]) != null ? JSON.parse(result["links"]) : new Array());
                }
                else
                    this.myDiagram.model = new go.GraphLinksModel();
            }).fail(function () {
                alert("Model was not upated, if this happens repeatedly, please contact: info@layrcake.com");
            });
    }

    getNextKey() {
        var key = this.nodeIdCounter;
        while (this.myDiagram.model.findNodeDataForKey(key.toString()) !== null) {
            key = this.nodeIdCounter -= 1;
        }
        return key.toString();
    }


    insertIntoArray() {
        var n = this.myDiagram.selection.first();
        if (n === null) return;
        var d = n.data;
        var count = n.data.methods.length;
        this.myDiagram.startTransaction("insertIntoTable");
        // add item as second in the list, at index #1
        // of course this new data could be more realistic:
        this.myDiagram.model.insertArrayItem(d.methods, count,
            { name: "(NEW PROPERTY)", returnType: "string" }
        );
        this.myDiagram.commitTransaction("insertIntoTable");
    }

    removeFromArray() {
        var n = this.myDiagram.selection.first();
        if (n === null) return;
        var d = n.data;
        if (n.data.methods.length < 8) return;
        this.myDiagram.startTransaction("removeFromTable");
        // remove second item of list, at index #1
        this.myDiagram.model.removeArrayItem(d.methods, 7);
        this.myDiagram.commitTransaction("removeFromTable");
    }

    //// define several shared Brushes
    bluegrad = this.MAKE(go.Brush, "Linear", { 0: "rgb(150, 150, 250)", 0.5: "rgb(86, 86, 186)", 1: "rgb(86, 86, 186)" });
    greengrad = this.MAKE(go.Brush, "Linear", { 0: "rgb(158, 209, 159)", 1: "rgb(67, 101, 56)" });
    redgrad = this.MAKE(go.Brush, "Linear", { 0: "rgb(206, 106, 100)", 1: "rgb(180, 56, 50)" });
    yellowgrad = this.MAKE(go.Brush, "Linear", { 0: "rgb(254, 221, 50)", 1: "rgb(254, 182, 50)" });
    lightgrad = this.MAKE(go.Brush, "Linear", { 1: "#E6E6FA", 0: "#FFFAF0" });

}