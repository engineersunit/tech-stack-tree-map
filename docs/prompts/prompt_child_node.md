# Task 
Implement Treemap child nodes with icons for technology

# Implementation High Level Summary
This task involved changes to data, backend and frontend layers
 - Data - Make the csv compatible to create a 2D array compatible for a Tree Map
 - Backend - Provide the 2D array
 - Frontend - Use the lead nodes to be expressive using icons or images


# Implementation Low Level Summary

## Prereq
 - update memory bank
 - follow your custom instructions
 - this task needs you to focus on csv | json | js | ojet
 - run the UI using the README info.
 - after completing each small step - check http://localhost:8000/ content and course correct if the page is not rendering

Proceed - 
In this file tech-stack-tree-map/src/data/tech_2025.csv - 

First - Data Layer 
Create another column in csv at first position named "Area" then fill the values for each row on the basis of the column "technology"

Second - JS Backend - 
Update the logic in tech-stack-tree-map/src/js/root.js to create the returned object of parseCsv as 2D array object array of objects.

Third - OJET Frontend -
Understand about TreeMaps here https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=treemap&demo=default
Element oj-treemap - https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojTreemap.html
Element oj-treemap-node - https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojTreemapNode.html

After understanding that Treemaps display 2 dimensions of hierarchical data using the size and color of the nodes, proceed to implement oj-treemap-node for the child nodes

Implementation details for the child nodes

- For each technology fetch from internet, open source icon images and place them in the folder tech-stack-tree-map/docs/images
- Use these icons for each leaf level nodes for the element oj-treemap-node using template nodeContentTemplate. Example is here https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=treemap&demo=nodeContent

```
<oj-treemap
              id="treemap"
              animation-on-display="auto"
              animation-on-data-change="auto"
              data="[[treemapData]]">
              <template slot="nodeTemplate">
                <oj-treemap-node
                  label="[[$current.data.title == 'Manager' ? $current.data.name + ' Org' : $current.data.name]]"
                  value="10"
                  color="[[getColor($current.data.title)]]"
                  short-desc="[[getShortDesc($current.data.name, $current.data.title)]]"></oj-treemap-node>
              </template>
              <template slot="nodeContentTemplate">
                <div
                  :style="[[{'position': 'absolute',
                      'display':'flex',
                      'justifyContent':'center',
                      'width': $current.bounds.width + 'px',
                      'height': $current.bounds.height + 'px',
                      'top': $current.bounds.y + 'px',
                      'left': $current.bounds.x + 'px',
                      'pointerEvents': 'none'}]]">
                  <div class="demo-treemap-nodeContent-style oj-helper-text-align-center">
                    <div
                      :style="[[{
                        'backgroundImage': 'url(\'../images/dvt/' + $current.data.id + '.png\')',
                        'marginLeft':'auto',
                        'marginRight':'auto',
                        'backgroundSize': 'cover',
                        'borderRadius': '20%',
                        'width': '3.125rem',
                        'height': '3.125rem'}
                    ]]"></div>
                    <oj-bind-if test="[[!isSmall()]]">
                      <div
                        class="oj-sm-margin-2x-top oj-typography-bold oj-typography-body-md"
                        :style="[[{'color': getLabelColor($current.itemData.title)}]]">
                        <oj-bind-text value="[[$current.itemData.name]]"></oj-bind-text>
                      </div>
                      <div
                        class="oj-typography-body-sm"
                        :style="[[{'color': getLabelColor($current.itemData.title)}]]">
                        <oj-bind-text value="[[$current.itemData.title]]"></oj-bind-text>
                      </div>
                    </oj-bind-if>
                  </div>
                </div>
              </template>
            </oj-treemap> 
```

 
 - Add code comments - a little too much in the js code
 - Update README
 - Refer README for running the UI
 - Test using - check http://localhost:8000/ content and course correct if the page is not rendering
 - Debugging Utils
    - Add debugging statements at crucial points in the js code
    - Make the statements print controlled by a flag
- For the icon or image sources - please update readme with the sources and mention that they are open source and we are not using copywrited sources.